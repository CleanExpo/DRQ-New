import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';

export const metadata: Metadata = {
  title: 'Water Damage Restoration | Disaster Recovery QLD',
  description: 'Professional water damage restoration services for homes and businesses',
};

export default function Page() {
  return (
    <ServicePage
      title="Water Damage Restoration"
      description="Professional water damage restoration services for homes and businesses"
      image="/images/water-damage-restoration.jpg"
      slug="water-damage"
    />
  );
}