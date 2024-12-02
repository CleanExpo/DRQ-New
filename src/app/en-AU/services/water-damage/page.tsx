import type { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { LOCATIONS } from '@/config/locations';
import { notFound } from 'next/navigation';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((location) => ({
    location,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { location: string };
  searchParams: SearchParams;
}): Promise<Metadata> {
  const location = LOCATIONS[params.location];
  
  if (!location) {
    return {
      title: 'Location Not Found',
      description: 'The requested location page could not be found.'
    };
  }

  const imageUrl = typeof location.image === 'string' 
    ? location.image 
    : location.image?.url || '/images/default-location.jpg';

  return {
    title: `${location.name} | Disaster Recovery QLD`,
    description: `Professional restoration services in ${location.name}. Available 24/7 for emergency response.`,
    openGraph: {
      title: `${location.name} | Disaster Recovery QLD`,
      description: `Professional restoration services in ${location.name}. Available 24/7 for emergency response.`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: location.name
        }
      ]
    }
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { location: string };
  searchParams: SearchParams;
}) {
  const location = LOCATIONS[params.location];

  if (!location) {
    notFound();
  }

  return <LocationPage location={location} />;
}