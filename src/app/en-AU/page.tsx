import { Metadata } from 'next';
import { HomePage } from '@/components/templates/HomePage';

export const metadata: Metadata = {
  title: 'Disaster Recovery QLD - Emergency Restoration Services',
  description: 'Professional disaster recovery and restoration services in Queensland. 24/7 emergency response for water damage, flood cleanup, and storm damage repair.',
};

export default function Page() {
  return <HomePage />;
}
