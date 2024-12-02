import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Contact Disaster Recovery QLD',
    default: 'Contact Us | Disaster Recovery QLD',
  },
  description: '24/7 emergency water damage restoration services in Southeast Queensland. Contact us for immediate assistance with water damage, flood cleanup, or mould remediation.',
  openGraph: {
    title: 'Contact Disaster Recovery QLD',
    description: '24/7 emergency water damage restoration services in Southeast Queensland. Contact us for immediate assistance.',
    images: [
      {
        url: '/images/water-damage-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Disaster Recovery QLD',
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
