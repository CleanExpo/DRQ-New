'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MegaMenu } from './MegaMenu';

export function Navigation() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/en-AU" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Disaster Recovery QLD"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Services & Locations
            </button>
            <Link
              href="/en-AU/about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/en-AU/contact"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              1300 309 361
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Main menu"
              {...(isMobileMenuOpen && { 'aria-expanded': 'true' })}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          aria-labelledby="mobile-menu-button"
        >
          <div className="pt-2 pb-4 space-y-1">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMegaMenuOpen(true);
              }}
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              Services & Locations
            </button>
            <Link
              href="/en-AU/about"
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/en-AU/contact"
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-4 py-3">
              <a
                href="tel:1300309361"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Call 1300 309 361
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />
    </nav>
  );
}
