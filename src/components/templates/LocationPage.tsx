import { Location, LocationImage } from '@/types/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';

interface LocationPageProps {
  location: Location;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image: LocationImage;
}

export function LocationPage({ location, coordinates, image }: LocationPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
        <p className="text-xl text-gray-600">{location.description}</p>
      </header>

      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <img
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Location</h2>
          <address className="text-gray-600 not-italic mb-4">
            {location.address.streetAddress}<br />
            {location.address.suburb}, {location.address.state} {location.address.postcode}
          </address>
          
          <h3 className="text-xl font-bold mb-2">Available Services</h3>
          <ul className="list-disc list-inside text-gray-600">
            {location.services.map(service => (
              <li key={service} className="mb-1">
                <a
                  href={`/en-AU/services/${service}/${location.slug}`}
                  className="hover:text-blue-600"
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            url: `https://disasterrecoveryqld.au/en-AU/locations/${location.slug}`
          })
        }}
      />
    </div>
  );
}
