'use client';

import { GoogleMap } from '@/components/maps/GoogleMap';
import { getLocation, getLocations } from '@/lib/locations';
import { getServices } from '@/lib/services';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface LocationPageProps {
  params: {
    location: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocation(params.location);
  const services = getServices();
  const nearbyLocations = getLocations()
    .filter(l => l.id !== location?.id)
    .slice(0, 3);

  if (!location) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {location.name} Emergency Restoration Services
      </h1>

      {/* Location Map */}
      <section className="mb-12">
        <GoogleMap 
          center={{ 
            lat: location.coordinates.lat, 
            lng: location.coordinates.lng 
          }}
          zoom={12}
          height="400px"
          className="mb-6"
        />
        <p className="text-gray-600">
          {location.description}
        </p>
      </section>

      {/* Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Services in {location.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={`/en-AU/services/${service.slug}/${location.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Locations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Nearby Service Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {nearbyLocations.map((nearby) => (
            <div key={nearby.id} className="border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{nearby.name}</h3>
              <p className="text-gray-600 mb-4">{nearby.description}</p>
              <Link 
                href={`/en-AU/locations/${nearby.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Services →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Need Emergency Service in {location.name}?</h2>
        <p className="text-gray-600 mb-6">
          Our team is available 24/7 for rapid response to all types of property damage emergencies.
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
