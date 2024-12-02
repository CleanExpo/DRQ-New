import { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { getLocationImage } from '@/lib/images';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Brisbane Emergency Restoration Services | Disaster Recovery QLD',
  description: 'Emergency restoration services in Brisbane and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('brisbane');
  
  if (!location) {
    notFound();
  }

  const image = getLocationImage(location);

  return (
    <LocationPage
      location={location}
      image={image}
    />
  );
}