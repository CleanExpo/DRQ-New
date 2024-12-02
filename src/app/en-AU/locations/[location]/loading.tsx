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

      {/* Location Details Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="h-8 w-1/3 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                <div className="h-8 w-1/3 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="h-12 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="h-8 w-1/2 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="space-y-8">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-4">
                      <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 w-full bg-gray-200 rounded animate-pulse"
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="h-8 w-1/3 bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="flex justify-center gap-4">
            <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
