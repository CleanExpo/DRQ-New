import type { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { LOCATIONS } from '@/config/locations';
import { SERVICE_CONTENT } from '@/config/content';
import { notFound } from 'next/navigation';
import { ServiceLocationPageProps } from '@/types/next';

// @ts-ignore
checkFields<any>();

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
}: {
  params: { service: string; location: string };
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

async function getServiceAndLocation(service: string, location: string) {
  const locationData = LOCATIONS[location];
  const serviceKey = service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const serviceData = SERVICE_CONTENT[serviceKey];

  return Promise.resolve({
    location: locationData,
    service: serviceData ? {
      title: serviceData.title,
      description: serviceData.description,
      image: serviceData.image,
      slug: service
    } : null
  });
}

export default async function Page({ params }: ServiceLocationPageProps) {
  const { location, service } = await getServiceAndLocation(
    params.service,
    params.location
  );

  if (!location || !service) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={service}
      location={location}
    />
  );
}
