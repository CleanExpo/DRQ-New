'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/config/services';
import { LOCATIONS } from '@/config/locations';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'locations'>('services');

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Main Menu"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Menu Content */}
      <div className="relative bg-white shadow-xl">
        {/* Menu Header */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-8" role="tablist">
                <button
                  role="tab"
                  id="services-tab"
                  className={`px-4 py-2 font-medium text-sm transition-colors ${
                    activeTab === 'services'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('services')}
                  aria-selected="true"
                  aria-controls="services-panel"
                  tabIndex={activeTab === 'services' ? 0 : -1}
                >
                  Our Services
                </button>
                <button
                  role="tab"
                  id="locations-tab"
                  className={`px-4 py-2 font-medium text-sm transition-colors ${
                    activeTab === 'locations'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('locations')}
                  aria-selected="false"
                  aria-controls="locations-panel"
                  tabIndex={activeTab === 'locations' ? 0 : -1}
                >
                  Service Areas
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900"
                aria-label="Close Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="container mx-auto px-4 py-8">
          <div
            role="tabpanel"
            id="services-panel"
            className={activeTab === 'services' ? 'block' : 'hidden'}
            aria-labelledby="services-tab"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.values(SERVICES).map((service) => (
                <Link
                  key={service.slug}
                  href={`/en-AU/services/${service.slug}`}
                  className="group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  onClick={onClose}
                >
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                      {service.title}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                    <div className="mt-4 flex items-center text-primary font-medium text-sm">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div
            role="tabpanel"
            id="locations-panel"
            className={activeTab === 'locations' ? 'block' : 'hidden'}
            aria-labelledby="locations-tab"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.values(LOCATIONS).map((location) => (
                <Link
                  key={location.slug}
                  href={`/en-AU/locations/${location.slug}`}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  onClick={onClose}
                >
                  <div className="relative h-40">
                    <Image
                      src={typeof location.image === 'string' ? location.image : '/images/default-location.jpg'}
                      alt={`${location.name} service area`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                      {location.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {location.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600"
                        >
                          {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      ))}
                      {location.services.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                          +{location.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
