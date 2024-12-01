'use client';

import { GoogleMap } from '@/components/maps/GoogleMap';
import { getLocations } from '@/lib/locations';
import Link from 'next/link';

export default function LocationsPage() {
  const locations = getLocations();
  const brisbaneLocation = { lat: -27.4698, lng: 153.0251 };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Service Locations</h1>

      {/* Main Brisbane Map */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Brisbane Service Area</h2>
        <GoogleMap 
          center={brisbaneLocation}
          zoom={10}
          height="500px"
          className="mb-6"
        />
        <p className="text-gray-600">
          We provide emergency restoration services throughout Brisbane and surrounding areas.
          Our team is available 24/7 for rapid response to water damage, fire damage, and other emergencies.
        </p>
      </section>

      {/* Location List */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((location) => (
          <div key={location.id} className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
            <GoogleMap 
              center={{ 
                lat: location.coordinates.lat, 
                lng: location.coordinates.lng 
              }}
              zoom={12}
              height="200px"
              className="mb-4"
            />
            <p className="text-gray-600 mb-4">{location.description}</p>
            <Link 
              href={`/en-AU/locations/${location.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Services in {location.name} →
            </Link>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Need Emergency Service?</h2>
        <p className="text-gray-600 mb-6">
          We provide 24/7 emergency response throughout South East Queensland.
          Contact us immediately for rapid assistance.
        </p>
        <Link
          href="/en-AU/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
        >
          Contact Us Now
        </Link>
      </section>
    </div>
  );
}
