export interface MonitoringConfig {
  enabled: boolean;
  sampleRate: number;
  errorThreshold: number;
}

export interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export interface ErrorEvent {
  message: string;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

export interface NetworkRequest {
  url: string;
  method: string;
  duration: number;
  status: number;
  timestamp: number;
}

export interface ResourceTiming {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  initiatorType: string;
}

export interface UserInteraction {
  type: string;
  target: string;
  timestamp: number;
  duration?: number;
}

export interface MonitoringData {
  sessionId: string;
  timestamp: number;
  url: string;
  performance: PerformanceMetrics;
  errors: ErrorEvent[];
  network: NetworkRequest[];
  resources: ResourceTiming[];
  interactions: UserInteraction[];
}

export interface MonitoringResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface MonitoringOptions {
  endpoint: string;
  sampleRate: number;
  enableConsoleLogging: boolean;
}

export interface MonitoringEvent {
  type: 'error' | 'performance' | 'network' | 'interaction';
  data: ErrorEvent | PerformanceMetrics | NetworkRequest | UserInteraction;
  timestamp: number;
}
