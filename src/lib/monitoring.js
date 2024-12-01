const Sentry = require('@sentry/nextjs');
const { MongoClient } = require('mongodb');
const Redis = require('ioredis');

// Initialize monitoring
function initMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }
}

// Report error to monitoring system
async function reportError(error, context) {
  console.error('Error:', typeof error === 'string' ? error : error.message);
  
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context
    });
  }

  // Send to New Relic if configured
  if (process.env.NEW_RELIC_LICENSE_KEY) {
    const newrelic = require('newrelic');
    newrelic.noticeError(error, context);
  }

  // Log to LogRocket if configured
  if (process.env.LOGROCKET_APP_ID && typeof window !== 'undefined') {
    const LogRocket = require('logrocket');
    LogRocket.captureException(error, {
      extra: context
    });
  }
}

// Track metric
async function trackMetric(metric) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.addBreadcrumb({
      category: 'metrics',
      message: `${metric.name}: ${metric.value}`,
      level: 'info',
      data: metric
    });

    // Send to New Relic if configured
    if (process.env.NEW_RELIC_LICENSE_KEY) {
      const newrelic = require('newrelic');
      newrelic.recordMetric(metric.name, metric.value);
    }
  }
}

// Monitor cache operations
function monitorCache(operation, duration, success) {
  trackMetric({
    name: `cache.${operation}`,
    value: duration,
    tags: {
      success: String(success)
    }
  });

  if (!success) {
    reportError(`Cache operation failed: ${operation}`, {
      duration,
      operation
    });
  }
}

// Send alert
async function sendAlert(message, level = 'info', context) {
  // Log locally
  const logMethod = level === 'error' ? console.error : 
                    level === 'warning' ? console.warn : 
                    console.info;
  logMethod(`[${level.toUpperCase()}] ${message}`);

  // Send to monitoring systems
  if (process.env.NODE_ENV === 'production') {
    // Sentry
    Sentry.addBreadcrumb({
      category: 'alerts',
      message,
      level,
      data: context
    });

    // New Relic
    if (process.env.NEW_RELIC_LICENSE_KEY) {
      const newrelic = require('newrelic');
      newrelic.recordCustomEvent('Alert', {
        message,
        level,
        ...context
      });
    }

    // LogRocket
    if (process.env.LOGROCKET_APP_ID && typeof window !== 'undefined') {
      const LogRocket = require('logrocket');
      LogRocket.track('Alert', {
        message,
        level,
        ...context
      });
    }
  }
}

// Monitor performance
function monitorPerformance(name, duration, context) {
  trackMetric({
    name: `performance.${name}`,
    value: duration,
    tags: context
  });

  // Alert if duration exceeds threshold
  const thresholds = {
    'cache.refresh': 60000, // 1 minute
    'api.request': 5000,    // 5 seconds
    'db.query': 1000       // 1 second
  };

  if (thresholds[name] && duration > thresholds[name]) {
    sendAlert(
      `Performance threshold exceeded for ${name}: ${duration}ms`,
      'warning',
      { duration, threshold: thresholds[name], ...context }
    );
  }
}

// Health check
async function performHealthCheck() {
  try {
    // Check MongoDB connection
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    await client.db().command({ ping: 1 });
    await client.close();

    // Check Redis if configured
    if (process.env.REDIS_URL) {
      const redis = new Redis(process.env.REDIS_URL);
      await redis.ping();
      await redis.quit();
    }

    return true;
  } catch (error) {
    reportError('Health check failed', { error });
    return false;
  }
}

// Export monitoring interface
module.exports = {
  init: initMonitoring,
  error: reportError,
  metric: trackMetric,
  cache: monitorCache,
  alert: sendAlert,
  performance: monitorPerformance,
  healthCheck: performHealthCheck
};
