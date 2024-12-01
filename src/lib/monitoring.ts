import * as Sentry from '@sentry/nextjs';

// Define gtag function type
type GtagFunction = (...args: any[]) => void;

export function initMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    try {
      // Initialize Sentry if DSN is provided
      if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
          tracesSampleRate: 1.0,
          environment: 'production',
        });
      }

      // Initialize Google Analytics if ID is provided
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        const gtag: GtagFunction = (...args) => {
          window.dataLayer.push(args);
        };
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', process.env.NEXT_PUBLIC_GA_ID);
      }

      console.log('✅ Monitoring initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing monitoring:', error);
    }
  }
}

// Error boundary for handling runtime errors
export function reportError(error: Error) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error);
  } else {
    console.error('Error:', error);
  }
}

// Performance monitoring
export function trackPerformance(metric: string, value: number) {
  if (process.env.NODE_ENV === 'production') {
    // Report to Google Analytics
    if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('event', 'performance', {
        event_category: 'Performance',
        event_label: metric,
        value: Math.round(value),
        non_interaction: true,
      });
    }

    // Report to Sentry
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureMessage(`Performance: ${metric} - ${value}ms`, 'info');
    }
  }
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: GtagFunction;
  }
}
