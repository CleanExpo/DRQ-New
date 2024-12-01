import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <Link 
          href="/en-AU"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
