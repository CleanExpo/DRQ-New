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
  // Main Office
  { name: 'Wacol (Main Office)', href: '/en-AU/locations/wacol' },
  
  // Satellite Offices
  { name: 'Brisbane CBD', href: '/en-AU/locations/brisbane-cbd' },
  { name: 'Logan City', href: '/en-AU/locations/logan-city' },
  { name: 'Gold Coast', href: '/en-AU/locations/gold-coast' },
  { name: 'Redland Shire', href: '/en-AU/locations/redland-shire' },
  { name: 'Ipswich', href: '/en-AU/locations/ipswich' },

  // Service Areas
  { name: 'Inner Brisbane Suburbs', href: '/en-AU/locations/inner-brisbane' },
  { name: 'Western Brisbane Suburbs', href: '/en-AU/locations/western-brisbane' },
  { name: 'Brisbane South Suburbs', href: '/en-AU/locations/brisbane-south' },
  { name: 'Brisbane Eastern Suburbs', href: '/en-AU/locations/brisbane-east' },
  { name: 'Ipswich Country Areas', href: '/en-AU/locations/ipswich-country' },
  { name: 'Summerset Region', href: '/en-AU/locations/summerset' },
  { name: 'Lockyer Valley', href: '/en-AU/locations/lockyer-valley' },
  { name: 'Toowoomba Range', href: '/en-AU/locations/toowoomba-range' },
  { name: 'Scenic Rim Districts', href: '/en-AU/locations/scenic-rim' },
  { name: 'Gold Coast Hinterlands', href: '/en-AU/locations/gold-coast-hinterlands' },
  { name: 'Logan Village', href: '/en-AU/locations/logan-village' }
];

export function NearbyLocations({ 
  title = "Service Areas",
  locations = defaultLocations 
}: NearbyLocationsProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <div className="mt-8 text-center text-gray-600">
        <p>Main Office: 17 Tile St Wacol, QLD 4076</p>
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
    </section>
  );
}
