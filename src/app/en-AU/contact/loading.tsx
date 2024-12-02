export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative h-[300px] bg-gray-200 animate-pulse">
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-3xl">
            <div className="h-12 w-2/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info Skeleton */}
            <div>
              <div className="h-8 w-1/3 bg-gray-200 rounded mb-8 animate-pulse"></div>
              
              {/* Emergency Contact Skeleton */}
              <div className="mb-8">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Office Location Skeleton */}
              <div className="mb-8">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Hours Skeleton */}
              <div className="mb-8">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Form Skeleton */}
            <div>
              <div className="h-8 w-1/3 bg-gray-200 rounded mb-8 animate-pulse"></div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-1/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Map Skeleton */}
          <div className="mt-16">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-8 animate-pulse"></div>
            <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
