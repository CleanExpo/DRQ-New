import Link from 'next/link';
import { Location, NearbyLocation, serviceLocations } from '@/types/locations';

interface NearbyLocationsProps {
  title?: string;
  locations?: NearbyLocation[];
  showAllLocations?: boolean;
  currentLocation?: Location;
}

export function NearbyLocations({ 
  title = "Service Areas",
  locations = serviceLocations.map(loc => ({
    name: loc.name,
    slug: loc.slug,
    distance: 0
  })),
  showAllLocations = true,
  currentLocation
}: NearbyLocationsProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {locations.map((location, index) => (
          <Link
            key={`${location.slug}-${index}`}
            href={`/en-AU/locations/${location.slug}`}
            className="block bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold">{location.name}</h3>
            {location.distance > 0 && (
              <p className="text-sm text-gray-600 mt-1">{location.distance}km away</p>
            )}
          </Link>
        ))}
      </div>

      {currentLocation && (
        <div className="mt-8 text-center text-gray-600">
          <p>Current Location: {currentLocation.address.streetAddress}, {currentLocation.address.suburb}, {currentLocation.address.state} {currentLocation.address.postcode}</p>
          <p className="mt-2">
            Open Monday - Friday 8am - 4pm<br />
            Saturday and Sunday (On-call)<br />
            24/7 Emergency Service Available
          </p>
          <p className="mt-2">
            Emergency Contact: <a href="tel:1300309361" className="text-primary hover:underline">1300 309 361</a><br />
            Email: <a href="mailto:admin@disasterrecoveryqld.au" className="text-primary hover:underline">admin@disasterrecoveryqld.au</a>
          </p>
        </div>
      )}

      {showAllLocations && (
        <div className="mt-8 text-center">
          <Link
            href="/en-AU/locations"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            View All Locations
          </Link>
        </div>
      )}
    </section>
  );
}
