interface NearbyLocation {
  name: string;
  url: string;
  description: string;
}

interface NearbyLocationsProps {
  locations: NearbyLocation[];
  service?: string;
}

export function NearbyLocations({ locations, service }: NearbyLocationsProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">Nearby Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(location => (
          <a
            key={location.url}
            href={service ? `${location.url}/${service}` : location.url}
            className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{location.name}</h3>
            <p className="text-gray-600">{location.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
