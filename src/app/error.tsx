'use client';

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Something Went Wrong</h1>
        <p className="text-gray-600 mb-8">
          We encountered an error while processing your request. Please try again.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/en-AU"
            className="inline-block border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
          >
            Return Home
          </a>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>Need immediate assistance?</p>
          <a href="tel:1300309361" className="text-primary hover:underline font-semibold">
            Call 1300 309 361
          </a>
        </div>
      </div>
    </div>
  );
}
