import Link from 'next/link';

interface Location {
  name: string;
  href: string;
  distance?: string;
}

interface NearbyLocationsProps {
  title?: string;
  locations?: Location[];
}

const defaultLocations: Location[] = [
  { name: 'Brisbane', href: '/locations/brisbane' },
  { name: 'Gold Coast', href: '/locations/gold-coast' },
  { name: 'Sunshine Coast', href: '/locations/sunshine-coast' },
  { name: 'Ipswich', href: '/locations/ipswich' },
  { name: 'Logan', href: '/locations/logan' }
];

export function NearbyLocations({ 
  title = "Nearby Locations",
  locations = defaultLocations 
}: NearbyLocationsProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {locations.map((location, index) => (
          <Link
            key={index}
            href={location.href}
            className="block bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold">{location.name}</h3>
            {location.distance && (
              <p className="text-sm text-gray-600 mt-1">{location.distance}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
