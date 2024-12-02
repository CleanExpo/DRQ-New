import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Water Damage Restoration in Brisbane | Disaster Recovery QLD',
  description: 'Professional water damage restoration services for homes and businesses in Brisbane and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('brisbane');
  
  if (!location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: "Water Damage Restoration",
        description: "Professional water damage restoration services for homes and businesses",
        image: "/images/water-damage-restoration.jpg",
        slug: "water-damage"
      }}
      location={location}
    />
  );
}