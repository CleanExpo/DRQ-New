import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sewage Cleanup in Gold Coast | Disaster Recovery QLD',
  description: 'Professional sewage cleanup and sanitization services in Gold Coast and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('gold-coast');
  
  if (!location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: "Sewage Cleanup",
        description: "Professional sewage cleanup and sanitization services",
        image: "/images/sewage-cleanup.jpg",
        slug: "sewage-cleanup"
      }}
      location={location}
    />
  );
}