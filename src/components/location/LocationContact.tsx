'use client';

import { Location } from '@/types/locations';

interface LocationContactProps {
  location: Location;
}

export function LocationContact({ location }: LocationContactProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Emergency Service?</h2>
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
          {location.address && (
            <div className="mt-12 text-gray-600">
              <p className="font-medium">{location.name} Office</p>
              <p>{location.address.streetAddress}</p>
              <p>{location.address.suburb}, {location.address.state} {location.address.postcode}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
