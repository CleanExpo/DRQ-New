export default function AboutLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative h-[400px] bg-gray-200 animate-pulse">
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <div className="max-w-3xl">
            <div className="h-12 w-2/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Content Skeleton */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <div className="h-8 w-1/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* List Section */}
              <div>
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* CTA Section Skeleton */}
              <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                <div className="h-8 w-1/2 bg-gray-200 rounded mb-4 animate-pulse mx-auto"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-6 animate-pulse mx-auto"></div>
                <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
