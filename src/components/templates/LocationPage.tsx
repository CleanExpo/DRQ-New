import Image from 'next/image';
import { Location, LocationImage } from '@/types/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { SchemaProvider } from '@/components/SchemaProvider';

interface LocationPageProps {
  location: Location;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image: LocationImage;
}

export function LocationPage({ location, coordinates, image }: LocationPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Disaster Recovery Queensland - " + location.name,
    image: image.url,
    description: location.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.streetAddress,
      addressLocality: location.address.suburb,
      addressRegion: location.address.state,
      postalCode: location.address.postcode,
      addressCountry: location.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    },
    url: `https://disasterrecoveryqld.au/en-AU/locations/${location.slug}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00"
      }
    ],
    specialOpeningHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "24/7 Emergency Service Available"
    }
  };

  return (
    <SchemaProvider schema={schema}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
          <p className="text-xl text-gray-600">{location.description}</p>
        </header>

        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <address className="text-gray-600 not-italic mb-4">
              {location.address.streetAddress}<br />
              {location.address.suburb}, {location.address.state} {location.address.postcode}
            </address>
            
            <div className="bg-primary/10 rounded-lg p-6 mb-6">
              <p className="font-semibold mb-2">Business Hours:</p>
              <p>Monday - Friday: 8am - 4pm<br />
              Saturday - Sunday: On-call<br />
              24/7 Emergency Service Available</p>
              <p className="mt-4">
                <a href="tel:1300309361" className="text-primary hover:underline font-bold">
                  1300 309 361
                </a>
              </p>
            </div>
            
            <h3 className="text-xl font-bold mb-2">Available Services</h3>
            <ul className="list-disc list-inside text-gray-600">
              {location.services.map(service => (
                <li key={service} className="mb-1">
                  <a
                    href={`/en-AU/services/${service}/${location.slug}`}
                    className="hover:text-primary"
                  >
                    {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="h-96 rounded-lg overflow-hidden">
              <GoogleMap
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                zoom={14}
              />
            </div>
          </div>
        </div>

        {location.nearbyLocations && location.nearbyLocations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Nearby Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.nearbyLocations.map(nearby => (
                <a
                  key={nearby.url}
                  href={nearby.url}
                  className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{nearby.name}</h3>
                  <p className="text-gray-600">{nearby.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </SchemaProvider>
  );
}
