import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Mould Remediation in Brisbane | Disaster Recovery QLD',
  description: 'Professional mould removal and remediation services in Brisbane and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('brisbane');
  
  if (!location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: "Mould Remediation",
        description: "Professional mould removal and remediation services",
        image: "/images/mould-remediation.jpg",
        slug: "mould-remediation"
      }}
      location={location}
    />
  );
}