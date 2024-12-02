'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error('Location page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Error Loading Location
        </h1>
        <p className="text-gray-600 mb-8">
          We encountered an error while loading this location. Please try again or view our other service areas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/en-AU/locations"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-gray-50 transition-colors"
          >
            View All Locations
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">Need immediate assistance?</p>
          <a
            href="tel:1300309361"
            className="text-primary hover:underline font-medium"
          >
            Call 1300 309 361
          </a>
        </div>
      </div>
    </div>
  );
}
