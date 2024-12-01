'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">We apologize for the inconvenience. Please try again.</p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
