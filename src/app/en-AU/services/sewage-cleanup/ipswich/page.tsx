import type { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { LOCATIONS } from '@/config/locations';
import { SERVICE_CONTENT } from '@/config/content';
import { notFound } from 'next/navigation';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateStaticParams() {
  const services = Object.keys(SERVICE_CONTENT).map(service => 
    service.toLowerCase().replace(/_/g, '-')
  );
  const locations = Object.keys(LOCATIONS);

  const params = [];
  for (const service of services) {
    for (const location of locations) {
      params.push({
        service,
        location,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { service: string; location: string };
  searchParams: SearchParams;
}): Promise<Metadata> {
  const location = LOCATIONS[params.location];
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const service = SERVICE_CONTENT[serviceKey];
  
  if (!location || !service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.'
    };
  }

  return {
    title: `${service.title} in ${location.name} | Disaster Recovery QLD`,
    description: `Professional ${service.title.toLowerCase()} services in ${location.name}. Available 24/7 for emergency response.`,
    openGraph: {
      title: `${service.title} in ${location.name} | Disaster Recovery QLD`,
      description: `Professional ${service.title.toLowerCase()} services in ${location.name}. Available 24/7 for emergency response.`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} in ${location.name}`
        }
      ]
    }
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { service: string; location: string };
  searchParams: SearchParams;
}) {
  const location = LOCATIONS[params.location];
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const service = SERVICE_CONTENT[serviceKey];

  if (!location || !service) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: service.title,
        description: service.description,
        image: service.image,
        slug: params.service
      }}
      location={location}
    />
  );
}