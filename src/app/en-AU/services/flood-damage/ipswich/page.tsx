import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Flood Damage Cleanup in Ipswich | Disaster Recovery QLD',
  description: 'Expert flood damage cleanup and restoration services in Ipswich and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('ipswich');
  
  if (!location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: "Flood Damage Cleanup",
        description: "Expert flood damage cleanup and restoration services",
        image: "/images/flood-damage-cleanup.jpg",
        slug: "flood-damage"
      }}
      location={location}
    />
  );
}