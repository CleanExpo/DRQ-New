'use client';

import { GoogleMap } from '@/components/maps/GoogleMap';
import { Location } from '@/types/locations';

interface LocationsPageProps {
  locations: Location[];
}

export function LocationsPage({ locations }: LocationsPageProps) {
  const markers = locations.map(location => ({
    position: {
      lat: location.coordinates.latitude,
      lng: location.coordinates.longitude
    },
    title: location.name
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <GoogleMap
            center={{
              lat: -27.4698,
              lng: 153.0251
            }}
            zoom={8}
            markers={markers}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Service Locations
            </h1>
            <p className="text-xl text-white/90">
              Professional disaster recovery services across Southeast Queensland
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
                  <p className="text-gray-600 mb-4">{location.description}</p>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Service Areas:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {(location.serviceArea || []).map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Emergency Assistance?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team is available 24/7 to help with your emergency restoration needs.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Call 1300 309 361
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
