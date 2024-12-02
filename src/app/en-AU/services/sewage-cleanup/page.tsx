import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';

export const metadata: Metadata = {
  title: 'Sewage Cleanup | Disaster Recovery QLD',
  description: 'Professional sewage cleanup and sanitization services',
};

export default function Page() {
  return (
    <ServicePage
      title="Sewage Cleanup"
      description="Professional sewage cleanup and sanitization services"
      image="/images/sewage-cleanup.jpg"
      slug="sewage-cleanup"
    />
  );
}