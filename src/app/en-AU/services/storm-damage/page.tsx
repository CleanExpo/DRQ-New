import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';

export const metadata: Metadata = {
  title: 'Storm Damage Repair | Disaster Recovery QLD',
  description: 'Emergency storm damage repair and restoration',
};

export default function Page() {
  return (
    <ServicePage
      title="Storm Damage Repair"
      description="Emergency storm damage repair and restoration"
      image="/images/storm-damage-repair.jpg"
      slug="storm-damage"
    />
  );
}