import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Storm Damage Repair in Gold Coast | Disaster Recovery QLD',
  description: 'Emergency storm damage repair and restoration in Gold Coast and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('gold-coast');
  
  if (!location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: "Storm Damage Repair",
        description: "Emergency storm damage repair and restoration",
        image: "/images/storm-damage-repair.jpg",
        slug: "storm-damage"
      }}
      location={location}
    />
  );
}