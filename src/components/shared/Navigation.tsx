import Link from 'next/link';
import Image from 'next/image';

export function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-[120px] h-[120px] -my-6">
                <Image
                  src="/images/logo.png"
                  alt="Disaster Recovery QLD"
                  fill
                  className="object-contain"
                  priority
                  sizes="120px"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/en-AU/services" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Services
            </Link>
            <Link 
              href="/en-AU/locations" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Locations
            </Link>
            <Link 
              href="/en-AU/about" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/en-AU/contact" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center">
            <a
              href="tel:1300309361"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center space-x-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span>1300 309 361</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
