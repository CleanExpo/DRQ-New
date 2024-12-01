export type AlertLevel = 'info' | 'warning' | 'error';

export interface MetricPayload {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp?: number;
}

export interface ErrorPayload {
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp?: number;
}

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  checks: {
    mongodb?: {
      status: 'up' | 'down';
      latency?: number;
    };
    redis?: {
      status: 'up' | 'down';
      latency?: number;
    };
    cache?: {
      status: 'up' | 'down';
      size?: number;
      lastRefresh?: Date;
    };
  };
  timestamp: Date;
}

export interface MonitoringConfig {
  sentry?: {
    dsn: string;
    environment: string;
    tracesSampleRate: number;
  };
  newRelic?: {
    appName: string;
    licenseKey: string;
  };
  logRocket?: {
    appId: string;
  };
  thresholds?: {
    [key: string]: number;
  };
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  size: number;
  lastRefresh: Date;
  avgLatency: number;
  errorRate: number;
}

export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: Date;
  context?: Record<string, any>;
}

export interface AlertConfig {
  level: AlertLevel;
  message: string;
  context?: Record<string, any>;
  notify?: {
    slack?: boolean;
    email?: boolean;
    sms?: boolean;
  };
}

export interface MonitoringThresholds {
  cache: {
    refreshDuration: number;
    errorRate: number;
    maxSize: number;
  };
  api: {
    responseTime: number;
    errorRate: number;
  };
  database: {
    queryTime: number;
    connectionTime: number;
  };
}

// Default monitoring thresholds
export const DEFAULT_THRESHOLDS: MonitoringThresholds = {
  cache: {
    refreshDuration: 60000,  // 1 minute
    errorRate: 0.05,         // 5%
    maxSize: 1000000000      // 1GB
  },
  api: {
    responseTime: 5000,      // 5 seconds
    errorRate: 0.01          // 1%
  },
  database: {
    queryTime: 1000,         // 1 second
    connectionTime: 5000     // 5 seconds
  }
};

// Monitoring event types
export type MonitoringEvent = 
  | { type: 'error'; payload: ErrorPayload }
  | { type: 'metric'; payload: MetricPayload }
  | { type: 'alert'; payload: AlertConfig }
  | { type: 'health'; payload: HealthCheckResult };
