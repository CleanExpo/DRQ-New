'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { Location } from '@/types/locations';
import { LocationPageComponent } from '@/types/components';

export const LocationPage: LocationPageComponent = ({ location }) => {
  const imageUrl = typeof location.image === 'string' 
    ? location.image 
    : location.image?.url || '/images/default-location.jpg';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={location.name}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {location.name}
            </h1>
            <p className="text-xl text-white/90">
              Professional restoration services in {location.name} and surrounding areas.
              24/7 emergency response available.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services in {location.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {location.services.map((service) => (
              <Link
                key={service}
                href={`/en-AU/services/${service.toLowerCase().replace(/_/g, '-')}/${location.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      {service.replace(/_/g, ' ')}
                    </h3>
                    <p className="text-gray-600">
                      Professional {service.toLowerCase().replace(/_/g, ' ')} services in {location.name}.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Service Area</h2>
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <GoogleMap
                center={{
                  lat: location.coordinates.latitude,
                  lng: location.coordinates.longitude
                }}
                zoom={12}
                markers={[
                  {
                    position: {
                      lat: location.coordinates.latitude,
                      lng: location.coordinates.longitude
                    },
                    title: location.name
                  }
                ]}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Areas We Serve</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {location.serviceArea?.map((area) => (
                  <div key={area} className="bg-gray-50 rounded-lg px-4 py-2 text-center">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Emergency Service in {location.name}?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is available 24/7 for emergency restoration services in {location.name} and surrounding areas.
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
};
