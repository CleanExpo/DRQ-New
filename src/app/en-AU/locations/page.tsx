import { Metadata } from 'next';
import { LocationsPage } from '@/components/templates/LocationsPage';
import { Location, serviceLocations } from '@/types/locations';
import { getLocationImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Service Locations | Disaster Recovery QLD',
  description: 'Find professional restoration services in your area. We serve Brisbane, Gold Coast, Logan, and surrounding regions in Southeast Queensland.',
  openGraph: {
    title: 'Service Locations | Disaster Recovery QLD',
    description: 'Professional restoration services across Southeast Queensland. Find your nearest location.',
    images: [
      {
        url: '/images/locations-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery QLD Service Locations'
      }
    ]
  }
};

export default function Page() {
  // Process locations to ensure each has an image
  const locationsWithImages = serviceLocations.map((location: Location) => {
    const locationCopy = { ...location } as Partial<Location>;
    // Remove the image property if it exists to avoid type conflicts
    if ('image' in locationCopy) {
      delete locationCopy.image;
    }
    
    // Get the appropriate image for this location
    const image = getLocationImage(location);
    
    return {
      ...(locationCopy as Location),
      image
    };
  });

  return (
    <LocationsPage locations={locationsWithImages} />
  );
}
