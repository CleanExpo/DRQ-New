export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative h-[400px] flex items-center bg-gray-200 animate-pulse">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="h-12 w-2/3 bg-gray-300 rounded mb-6"></div>
            <div className="h-6 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>

      {/* Locations Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-8 w-1/2 bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="h-14 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-14 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
