'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbSegment {
  name: string;
  href: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = `/${array.slice(0, index + 1).join('/')}`;
      let name = segment.replace(/-/g, ' ');
      
      // Handle dynamic segments
      if (segment.startsWith('[') && segment.endsWith(']')) {
        name = 'Loading...'; // This will be updated with actual data
      }

      // Capitalize first letter of each word
      name = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return { name, href };
    });

  return [{ name: 'Home', href: '/en-AU' }, ...segments];
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 bg-gray-50">
      <div className="container mx-auto">
        <ol className="flex flex-wrap items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600 font-medium" aria-current="page">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
