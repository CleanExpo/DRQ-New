import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Mould Remediation in Gold Coast | Disaster Recovery QLD',
  description: 'Professional mould removal and remediation services in Gold Coast and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('gold-coast');
  
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