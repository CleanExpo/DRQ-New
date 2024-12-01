interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  timestamp: number;
}

interface PerformanceEvent {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  timestamp: number;
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Create a PerformanceObserver to monitor long tasks
  const longTaskObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      reportPerformanceMetric({
        name: 'long-task',
        value: entry.duration,
        timestamp: entry.startTime,
        id: `lt-${Date.now()}`
      });
    });
  });

  // Create a PerformanceObserver for First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const event = entry as PerformanceEventTiming;
      reportPerformanceEvent({
        name: 'first-input-delay',
        startTime: event.startTime,
        duration: event.duration,
        timestamp: Date.now(),
        id: `fid-${Date.now()}`
      });
    });
  });

  try {
    // Start observing long tasks
    longTaskObserver.observe({ entryTypes: ['longtask'] });
    // Start observing FID
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (error) {
    console.error('Performance monitoring initialization failed:', error);
  }
}

// Report a performance metric
export function reportPerformanceMetric(metric: PerformanceMetric) {
  try {
    // Get existing metrics from localStorage
    const metrics = JSON.parse(localStorage.getItem('performance_metrics') || '[]');
    
    // Add new metric
    metrics.push({
      ...metric,
      timestamp: metric.timestamp || Date.now()
    });

    // Store updated metrics
    localStorage.setItem('performance_metrics', JSON.stringify(metrics));

    // Send metric to analytics if available
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_id: metric.id
      });
    }
  } catch (error) {
    console.error('Failed to report performance metric:', error);
  }
}

// Report a performance event
export function reportPerformanceEvent(event: PerformanceEvent) {
  try {
    // Get existing events from localStorage
    const events = JSON.parse(localStorage.getItem('performance_events') || '[]');
    
    // Add new event
    events.push({
      ...event,
      timestamp: event.timestamp || Date.now()
    });

    // Store updated events
    localStorage.setItem('performance_events', JSON.stringify(events));

    // Send event to analytics if available
    if (window.gtag) {
      window.gtag('event', 'performance_event', {
        event_name: event.name,
        event_duration: event.duration,
        event_id: event.id
      });
    }
  } catch (error) {
    console.error('Failed to report performance event:', error);
  }
}

// Get all performance metrics
export function getPerformanceMetrics(): PerformanceMetric[] {
  try {
    return JSON.parse(localStorage.getItem('performance_metrics') || '[]');
  } catch (error) {
    console.error('Failed to get performance metrics:', error);
    return [];
  }
}

// Get all performance events
export function getPerformanceEvents(): PerformanceEvent[] {
  try {
    return JSON.parse(localStorage.getItem('performance_events') || '[]');
  } catch (error) {
    console.error('Failed to get performance events:', error);
    return [];
  }
}

// Clear all performance data
export function clearPerformanceData() {
  try {
    localStorage.removeItem('performance_metrics');
    localStorage.removeItem('performance_events');
  } catch (error) {
    console.error('Failed to clear performance data:', error);
  }
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
  }
}
