import { trackPerformance } from './monitoring';

// Web Vitals metrics
export function reportWebVitals(metric: any) {
  const { id, name, label, value } = metric;

  // Core Web Vitals
  if (name === 'FCP') {
    trackPerformance('First Contentful Paint', value);
  }
  if (name === 'LCP') {
    trackPerformance('Largest Contentful Paint', value);
  }
  if (name === 'CLS') {
    trackPerformance('Cumulative Layout Shift', value);
  }
  if (name === 'FID') {
    trackPerformance('First Input Delay', value);
  }
  if (name === 'TTFB') {
    trackPerformance('Time to First Byte', value);
  }

  // Custom metrics
  if (label === 'custom') {
    trackPerformance(name, value);
  }
}

// Custom performance tracking
export function trackPageLoad() {
  if (typeof window !== 'undefined') {
    // Navigation Timing API
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      trackPerformance('DOM Complete', navigation.domComplete);
      trackPerformance('DOM Interactive', navigation.domInteractive);
      trackPerformance('Load Event', navigation.loadEventEnd);
    }

    // Resource Timing API
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const imageResources = resources.filter(resource => resource.initiatorType === 'img');
    if (imageResources.length > 0) {
      const totalImageLoadTime = imageResources.reduce((total, resource) => total + resource.duration, 0);
      trackPerformance('Total Image Load Time', totalImageLoadTime);
    }
  }
}

// Memory usage tracking
export function trackMemoryUsage() {
  if (typeof window !== 'undefined' && (performance as any).memory) {
    const memory = (performance as any).memory;
    trackPerformance('Used JS Heap Size', memory.usedJSHeapSize / 1048576); // Convert to MB
    trackPerformance('Total JS Heap Size', memory.totalJSHeapSize / 1048576);
  }
}

// Network request tracking
export async function trackNetworkRequest(url: string, startTime: number) {
  const endTime = performance.now();
  const duration = endTime - startTime;
  trackPerformance(`API Request: ${url}`, duration);
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Track initial page load
    window.addEventListener('load', () => {
      trackPageLoad();
      trackMemoryUsage();
    });

    // Track subsequent navigations
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            trackPerformance('Navigation Time', entry.duration);
          }
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      // Track long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          trackPerformance('Long Task Duration', entry.duration);
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }
  }
}
