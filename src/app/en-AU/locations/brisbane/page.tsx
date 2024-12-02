import { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationBySlug } from '@/lib/locations';
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

  return <LocationPage location={location} />;
}
