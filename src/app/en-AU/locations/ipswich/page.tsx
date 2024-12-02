import { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { getLocationImage } from '@/lib/images';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ipswich Emergency Restoration Services | Disaster Recovery QLD',
  description: 'Comprehensive restoration services in Ipswich',
};

export default function Page() {
  const location = getLocationBySlug('ipswich');
  
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