import { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { getLocationImage } from '@/lib/images';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    location: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocationBySlug(params.location);
  
  if (!location) {
    return {
      title: 'Location Not Found | Disaster Recovery QLD',
      description: 'The requested location page could not be found.',
    };
  }

  return {
    title: `${location.name} Emergency Restoration Services | Disaster Recovery QLD`,
    description: `Professional disaster recovery and restoration services in ${location.name}. 24/7 emergency response for water damage, flood cleanup, and storm damage repair.`,
  };
}

export async function generateStaticParams() {
  return [
    { location: 'brisbane' },
    { location: 'gold-coast' },
    { location: 'ipswich' }
  ];
}

export default function Page({ params }: Props) {
  const location = getLocationBySlug(params.location);
  
  if (!location) {
    notFound();
  }

  const image = getLocationImage(location);

  return (
    <LocationPage
      location={location}
      image={image}
    />
  );
}
