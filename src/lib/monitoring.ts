import * as Sentry from '@sentry/nextjs';
import type { MetricPayload, ErrorPayload, AlertLevel } from '../types/monitoring';

// Initialize monitoring
export function initMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }
}

// Report error to monitoring system
export async function reportError(error: Error | string, context?: Record<string, any>) {
  console.error('Error:', typeof error === 'string' ? error : error.message);
  
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context
    });

    // Send to New Relic if configured
    if (process.env.NEW_RELIC_LICENSE_KEY) {
      const newrelic = await import('newrelic');
      newrelic.noticeError(error instanceof Error ? error : new Error(error.toString()), context);
    }

    // Log to LogRocket if configured
    if (process.env.LOGROCKET_APP_ID && typeof window !== 'undefined') {
      const LogRocket = await import('logrocket');
      LogRocket.captureException(error instanceof Error ? error : new Error(error.toString()), {
        extra: context
      });
    }
  }
}

// Track metric
export async function trackMetric(metric: MetricPayload) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.addBreadcrumb({
      category: 'metrics',
      message: `${metric.name}: ${metric.value}`,
      level: 'info',
      data: metric
    });

    // Send to New Relic if configured
    if (process.env.NEW_RELIC_LICENSE_KEY) {
      const newrelic = await import('newrelic');
      newrelic.recordMetric(metric.name, metric.value);
    }
  }
}

// Monitor cache operations
export function monitorCache(operation: string, duration: number, success: boolean) {
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
export async function sendAlert(message: string, level: AlertLevel = 'info', context?: Record<string, any>) {
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
      level: level as Sentry.SeverityLevel,
      data: context
    });

    // New Relic
    if (process.env.NEW_RELIC_LICENSE_KEY) {
      const newrelic = await import('newrelic');
      newrelic.recordCustomEvent('Alert', {
        message,
        level,
        ...context
      });
    }

    // LogRocket
    if (process.env.LOGROCKET_APP_ID && typeof window !== 'undefined') {
      const LogRocket = await import('logrocket');
      LogRocket.track('Alert', {
        message,
        level,
        ...context
      });
    }
  }
}

// Monitor performance
export function monitorPerformance(name: string, duration: number, context?: Record<string, any>) {
  trackMetric({
    name: `performance.${name}`,
    value: duration,
    tags: context
  });

  // Alert if duration exceeds threshold
  const thresholds: Record<string, number> = {
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
export async function performHealthCheck(): Promise<boolean> {
  try {
    // Check MongoDB connection
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    await client.db().command({ ping: 1 });
    await client.close();

    // Check Redis if configured
    if (process.env.REDIS_URL) {
      const { default: Redis } = await import('ioredis');
      const redis = new Redis(process.env.REDIS_URL);
      await redis.ping();
      await redis.quit();
    }

    return true;
  } catch (error) {
    await reportError('Health check failed', { error });
    return false;
  }
}

// Export monitoring interface
export const monitoring = {
  init: initMonitoring,
  error: reportError,
  metric: trackMetric,
  cache: monitorCache,
  alert: sendAlert,
  performance: monitorPerformance,
  healthCheck: performHealthCheck
};
