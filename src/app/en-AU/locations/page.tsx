import { Metadata } from 'next';
import { LocationsPage } from '@/components/templates/LocationsPage';
import { LOCATIONS } from '@/config/locations';

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
  const locations = Object.values(LOCATIONS);

  return (
    <LocationsPage locations={locations} />
  );
}
