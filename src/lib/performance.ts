// Performance monitoring and reporting utilities

interface PerformanceMetrics {
  FCP: number;  // First Contentful Paint
  LCP: number;  // Largest Contentful Paint
  FID: number;  // First Input Delay
  CLS: number;  // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
}

interface WebVitalsMetric {
  name: string;
  delta: number;
  id: string;
}

declare global {
  interface Window {
    gtag?: (command: string, name: string, params: Record<string, unknown>) => void;
  }
}

export function initializePerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Report Web Vitals to Google Analytics
  const reportWebVitals = ({ name, delta, id }: WebVitalsMetric): void => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        non_interaction: true,
      });
    }
  };

  // Initialize Performance Observer for LCP
  if (PerformanceObserver) {
    // LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      reportWebVitals({
        name: 'LCP',
        delta: lastEntry.startTime,
        id: lastEntry.id || String(Date.now())
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry instanceof PerformanceEventTiming) {
          reportWebVitals({
            name: 'FID',
            delta: entry.processingStart - entry.startTime,
            id: entry.id || String(Date.now())
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as LayoutShift[];
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];
          
          if (firstSessionEntry && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
            clsValue += entry.value;
            clsEntries.push(entry);
          } else {
            clsEntries = [entry];
            clsValue = entry.value;
          }
        }
      });

      reportWebVitals({
        name: 'CLS',
        delta: clsValue,
        id: 'cls-' + Date.now()
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Function to check if the page meets Core Web Vitals thresholds
export function checkCoreWebVitals(metrics: PerformanceMetrics): boolean {
  return (
    metrics.LCP <= 2500 && // Good LCP is under 2.5s
    metrics.FID <= 100 &&  // Good FID is under 100ms
    metrics.CLS <= 0.1     // Good CLS is under 0.1
  );
}

// Optimize image loading
export function optimizeImageLoading(): void {
  if (typeof window === 'undefined') return;

  // Detect support for native lazy loading
  const hasNativeLazyLoading = 'loading' in HTMLImageElement.prototype;

  // Find all images without explicit loading attribute
  const images = document.querySelectorAll('img:not([loading])');
  
  images.forEach(img => {
    if (hasNativeLazyLoading) {
      // Use native lazy loading if supported
      img.setAttribute('loading', 'lazy');
    } else {
      // Fallback to intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            if (image.dataset.src) {
              image.src = image.dataset.src;
            }
            observer.unobserve(image);
          }
        });
      });

      observer.observe(img);
    }
  });
}

// Optimize font loading
export function optimizeFontLoading(): void {
  if (typeof window === 'undefined') return;

  // Add font preload links
  const fonts = [
    { href: '/fonts/inter-var.woff2', type: 'font/woff2' },
    { href: '/fonts/montserrat-var.woff2', type: 'font/woff2' }
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = font.type;
    link.href = font.href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Initialize all performance optimizations
export function initializeOptimizations(): void {
  initializePerformanceMonitoring();
  optimizeImageLoading();
  optimizeFontLoading();
}

// Types for Layout Shift entries
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
