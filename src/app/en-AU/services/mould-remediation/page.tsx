import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';

export const metadata: Metadata = {
  title: 'Mould Remediation | Disaster Recovery QLD',
  description: 'Professional mould removal and remediation services',
};

export default function Page() {
  return (
    <ServicePage
      title="Mould Remediation"
      description="Professional mould removal and remediation services"
      image="/images/mould-remediation.jpg"
      slug="mould-remediation"
    />
  );
}