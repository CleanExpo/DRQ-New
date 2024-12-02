'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MegaMenu } from '@/components/shared/MegaMenu';
import { SearchBar } from '@/components/shared/SearchBar';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { UserPreferences } from '@/components/shared/UserPreferences';
import { NotificationBanner } from '@/components/shared/NotificationBanner';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { getServices } from '@/lib/services';
import { getLocationBySlug } from '@/lib/locations';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = getServices().map(service => ({
    name: service.title,
    href: `/en-AU/services/${service.slug}`,
    description: service.description,
    icon: service.image
  }));

  // Get locations from the locations service
  const locations = ['brisbane', 'gold-coast', 'ipswich']
    .map(slug => getLocationBySlug(slug))
    .filter(location => location !== undefined)
    .map(location => ({
      name: location!.name,
      href: `/en-AU/locations/${location!.slug}`,
      description: location!.description
    }));

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <>
      <NotificationBanner />
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${
          isSticky ? 'shadow-lg' : ''
        }`}
        style={{ marginTop: '40px' }} // Space for notification banner
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/en-AU" className="flex items-center">
              <span className="text-2xl font-bold text-primary">DRQ</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                href="/en-AU"
                className="px-4 py-2 text-gray-600 hover:text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>
              
              <MegaMenu
                title="Services"
                items={services}
                isOpen={activeDropdown === 'services'}
                onToggle={() => handleDropdownToggle('services')}
                onClose={() => setActiveDropdown(null)}
              />
              
              <MegaMenu
                title="Locations"
                items={locations}
                isOpen={activeDropdown === 'locations'}
                onToggle={() => handleDropdownToggle('locations')}
                onClose={() => setActiveDropdown(null)}
              />
              
              <Link
                href="/en-AU/about"
                className="px-4 py-2 text-gray-600 hover:text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                About Us
              </Link>
              
              <Link
                href="/en-AU/contact"
                className="px-4 py-2 text-gray-600 hover:text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact
              </Link>

              <SearchBar />
              <LanguageSelector />
              <UserPreferences />

              <div className="flex items-center space-x-4 ml-4">
                <a
                  href="tel:1300309361"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>1300 309 361</span>
                </a>
                <Link
                  href="/en-AU/quote"
                  className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-600"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
            }`}
          >
            <div className="py-4 border-t">
              <Link
                href="/en-AU"
                className="block px-4 py-2 text-gray-600 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <MegaMenu
                title="Services"
                items={services}
                isOpen={activeDropdown === 'services-mobile'}
                onToggle={() => handleDropdownToggle('services-mobile')}
                onClose={() => setActiveDropdown(null)}
              />
              
              <MegaMenu
                title="Locations"
                items={locations}
                isOpen={activeDropdown === 'locations-mobile'}
                onToggle={() => handleDropdownToggle('locations-mobile')}
                onClose={() => setActiveDropdown(null)}
              />
              
              <Link
                href="/en-AU/about"
                className="block px-4 py-2 text-gray-600 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              
              <Link
                href="/en-AU/contact"
                className="block px-4 py-2 text-gray-600 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="px-4 py-4 space-y-4">
                <SearchBar />
                <LanguageSelector />
                <UserPreferences />
                <a
                  href="tel:1300309361"
                  className="block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Call Now: 1300 309 361
                </a>
                <Link
                  href="/en-AU/quote"
                  className="block bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Breadcrumb />
      <div className="pt-40" /> {/* Space for fixed header and notification banner */}
    </>
  );
}
