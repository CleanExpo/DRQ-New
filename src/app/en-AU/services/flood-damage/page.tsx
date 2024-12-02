import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';

export const metadata: Metadata = {
  title: 'Flood Damage Cleanup | Disaster Recovery QLD',
  description: 'Expert flood damage cleanup and restoration services',
};

export default function Page() {
  return (
    <ServicePage
      title="Flood Damage Cleanup"
      description="Expert flood damage cleanup and restoration services"
      image="/images/flood-damage-cleanup.jpg"
      slug="flood-damage"
    />
  );
}