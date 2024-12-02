export default function TermsLoading() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title Skeleton */}
          <div className="h-10 w-1/3 bg-gray-200 rounded mb-8 animate-pulse"></div>
          
          {/* Content Skeleton */}
          <div className="space-y-6">
            {/* Paragraph blocks */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}

            {/* List blocks */}
            {[...Array(3)].map((_, i) => (
              <div key={`list-${i}`} className="space-y-2 ml-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ))}

            {/* Last Updated Skeleton */}
            <div className="mt-8">
              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
