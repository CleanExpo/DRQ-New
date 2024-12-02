import Link from 'next/link';

export default function NotFound() {
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Location Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The location you&apos;re looking for doesn&apos;t exist or may have been moved. Please check our available service areas or contact us for assistance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/en-AU/locations"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            View All Locations
          </Link>
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Need immediate assistance? Call us 24/7 at{' '}
          <a href="tel:1300309361" className="text-primary hover:underline">
            1300 309 361
          </a>
        </p>
      </div>
    </div>
  );
}
