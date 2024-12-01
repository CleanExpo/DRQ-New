import { Metadata } from 'next';
import { getLocations } from '@/lib/locations';
import { LocationsPage } from '@/components/templates/LocationsPage';
import { getLocationImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Service Locations - Disaster Recovery Queensland',
  description: 'Find professional restoration services in your area. We serve Brisbane, Gold Coast, and surrounding regions.',
  openGraph: {
    title: 'Service Locations - Disaster Recovery Queensland',
    description: 'Find professional restoration services in your area. We serve Brisbane, Gold Coast, and surrounding regions.',
    images: [
      {
        url: '/images/locations/map.jpg',
        width: 1200,
        height: 630,
        alt: 'DRQ Service Locations Map',
      },
    ],
  },
};

export default function LocationsPageRoute() {
  const locations = getLocations();
  const locationMarkers = locations.map(location => ({
    id: location.id,
    name: location.name,
    description: location.description,
    coordinates: {
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude
    },
    url: `/en-AU/locations/${location.slug}`,
    image: getLocationImage(location)
  }));

  return (
    <LocationsPage
      locations={locationMarkers}
      centerCoordinates={{
        latitude: -27.4698, // Brisbane
        longitude: 153.0251
      }}
    />
  );
}
