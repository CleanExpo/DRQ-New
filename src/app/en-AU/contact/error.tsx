'use client';

import { useEffect } from 'react';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Contact page error:', error);
  }, [error]);

  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Please try again or contact us directly.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Try again
          </button>
          <div className="pt-4">
            <p className="text-gray-600">Or contact us directly:</p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mt-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1300 309 361
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
