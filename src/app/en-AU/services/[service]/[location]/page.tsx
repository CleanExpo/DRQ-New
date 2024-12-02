import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { getService } from '@/lib/services';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    service: string;
    location: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService(params.service);
  const location = getLocationBySlug(params.location);
  
  if (!service || !location) {
    return {
      title: 'Service Not Found | Disaster Recovery QLD',
      description: 'The requested service page could not be found.',
    };
  }

  return {
    title: `${service.title} in ${location.name} | Disaster Recovery QLD`,
    description: `Professional ${service.title.toLowerCase()} services in ${location.name}. 24/7 emergency response for restoration and cleanup services.`,
  };
}

export async function generateStaticParams() {
  const locations = ['brisbane', 'gold-coast', 'ipswich'];
  const services = ['water-damage', 'flood-damage', 'mould-remediation', 'storm-damage', 'sewage-cleanup'];
  
  const params: Array<{ service: string; location: string }> = [];

  services.forEach((service) => {
    locations.forEach((location) => {
      params.push({
        service,
        location,
      });
    });
  });

  return params;
}

export default function Page({ params }: Props) {
  const service = getService(params.service);
  const location = getLocationBySlug(params.location);
  
  if (!service || !location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: service.title,
        description: service.description,
        image: service.image,
        slug: service.slug
      }}
      location={location}
    />
  );
}
