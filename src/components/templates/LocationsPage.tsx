import Image from 'next/image';
import { Location, LocationImage } from '@/types/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { SchemaProvider } from '@/components/SchemaProvider';

interface LocationsPageProps {
  locations: Array<{
    location: Location;
    image: LocationImage;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }>;
  centerCoordinates: {
    latitude: number;
    longitude: number;
  };
}

export function LocationsPage({ locations, centerCoordinates }: LocationsPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Disaster Recovery QLD",
    description: "Professional disaster recovery and restoration services across Southeast Queensland",
    url: "https://disasterrecoveryqld.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "17 Tile St",
      addressLocality: "Wacol",
      addressRegion: "QLD",
      postalCode: "4076",
      addressCountry: "AU"
    },
    areaServed: {
      "@type": "State",
      name: "Queensland"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "1300 309 361",
      contactType: "customer service",
      areaServed: "QLD",
      availableLanguage: "English",
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          description: "On-call service available"
        }
      ]
    }
  };

  return (
    <SchemaProvider schema={schema}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Service Locations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional restoration services across Southeast Queensland. With our main office in Wacol and satellite locations throughout the region, we're ready to respond to emergencies 24/7.
          </p>
          <div className="mt-6 bg-primary/10 rounded-lg p-6 inline-block">
            <p className="font-semibold mb-2">24/7 Emergency Service</p>
            <a href="tel:1300309361" className="text-2xl font-bold text-primary hover:underline">
              1300 309 361
            </a>
          </div>
        </header>

        <div className="h-[500px] mb-12 rounded-lg overflow-hidden">
          <GoogleMap
            latitude={centerCoordinates.latitude}
            longitude={centerCoordinates.longitude}
            zoom={9}
            height="500px"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map(({ location, image }) => (
            <a
              key={location.id}
              href={`/en-AU/locations/${location.slug}`}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
                <p className="text-gray-600 mb-4">{location.description}</p>
                <div className="text-sm text-gray-500">
                  {location.address.streetAddress && (
                    <p>{location.address.streetAddress}</p>
                  )}
                  <p>{location.address.suburb}, {location.address.state} {location.address.postcode}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="font-semibold mb-4">Main Office</p>
          <p>17 Tile St, Wacol, QLD 4076</p>
          <p className="mt-4">
            Monday - Friday: 8am - 4pm<br />
            Saturday - Sunday: On-call<br />
            24/7 Emergency Service Available
          </p>
          <p className="mt-4">
            Email: <a href="mailto:admin@disasterrecoveryqld.au" className="text-primary hover:underline">
              admin@disasterrecoveryqld.au
            </a>
          </p>
        </div>
      </div>
    </SchemaProvider>
  );
}
