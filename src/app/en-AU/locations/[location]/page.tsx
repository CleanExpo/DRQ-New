import { Metadata } from 'next';
import { getLocations, getLocationBySlug } from '@/lib/locations';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationImage } from '@/lib/images';

interface LocationPageParams {
  location: string;
}

export async function generateMetadata({ params }: { params: LocationPageParams }): Promise<Metadata> {
  const location = getLocationBySlug(params.location);
  if (!location) return {};

  const image = getLocationImage(location);

  return {
    title: `${location.name} - Disaster Recovery Queensland`,
    description: location.description,
    openGraph: {
      title: `${location.name} - Disaster Recovery Queensland`,
      description: location.description,
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: location.name,
        },
      ],
    },
  };
}

export default function LocationPageRoute({ params }: { params: LocationPageParams }) {
  const location = getLocationBySlug(params.location);
  if (!location) return null;

  const coordinates = {
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude
  };

  return (
    <LocationPage
      location={location}
      coordinates={coordinates}
      image={getLocationImage(location)}
    />
  );
}
