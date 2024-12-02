'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Location, LocationImage } from '@/types/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';

interface LocationsPageProps {
  locations: Array<Location & { image: LocationImage }>;
}

export function LocationsPage({ locations }: LocationsPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <GoogleMap
            latitude={-27.4698}
            longitude={153.0251}
            zoom={8}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Service Locations
            </h1>
            <p className="text-xl text-white/90">
              Professional restoration services across Southeast Queensland. Find your nearest location.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/en-AU/locations/${location.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow group-hover:shadow-xl">
                  <div className="relative h-48">
                    <Image
                      src={location.image.url}
                      alt={location.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {location.name}
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{location.description}</p>
                    <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                      <span className="font-medium">View Services</span>
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Emergency Service?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is available 24/7 for emergency restoration services across Southeast Queensland.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-lg font-semibold">Call 1300 309 361</span>
              </a>
              <a
                href="/en-AU/quote"
                className="inline-flex items-center justify-center space-x-2 bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-lg font-semibold">Get a Quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
