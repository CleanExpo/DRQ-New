import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. We might have moved or updated it.
        </p>
        <div className="space-y-4">
          <div>
            <Link
              href="/en-AU"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>Need immediate assistance?</p>
            <a href="tel:1300309361" className="text-primary hover:underline font-semibold">
              Call 1300 309 361
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
