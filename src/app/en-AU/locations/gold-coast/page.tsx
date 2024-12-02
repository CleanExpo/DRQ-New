import { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { getLocationImage } from '@/lib/images';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Gold Coast Emergency Restoration Services | Disaster Recovery QLD',
  description: 'Professional restoration services for the Gold Coast region',
};

export default function Page() {
  const location = getLocationBySlug('gold-coast');
  
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