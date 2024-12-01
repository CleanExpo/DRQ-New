import { LocationImage } from '@/types/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';

interface LocationMarker {
  id: string;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  url: string;
  image: LocationImage;
}

interface LocationsPageProps {
  locations: LocationMarker[];
  centerCoordinates: {
    latitude: number;
    longitude: number;
  };
}

export function LocationsPage({ locations, centerCoordinates }: LocationsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Service Locations</h1>
        <p className="text-xl text-gray-600">
          Find professional restoration services in your area. We serve Brisbane, Gold Coast, and surrounding regions.
        </p>
      </header>

      <div className="h-[600px] mb-8">
        <GoogleMap
          latitude={centerCoordinates.latitude}
          longitude={centerCoordinates.longitude}
          zoom={9}
          height="600px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map(location => (
          <a
            key={location.id}
            href={location.url}
            className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={location.image.url}
                alt={location.name}
                width={location.image.width}
                height={location.image.height}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
              <p className="text-gray-600">{location.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
