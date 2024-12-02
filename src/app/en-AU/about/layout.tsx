import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | About Disaster Recovery QLD',
    default: 'About Us | Disaster Recovery QLD',
  },
  description: 'Professional water damage restoration experts serving Southeast Queensland. Learn about our 24/7 emergency services and commitment to excellence.',
  openGraph: {
    title: 'About Disaster Recovery QLD',
    description: 'Professional water damage restoration experts serving Southeast Queensland. Learn about our services and commitment to excellence.',
    images: [
      {
        url: '/images/water-damage-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'About Disaster Recovery QLD',
      },
    ],
  },
};

export default function AboutLayout({
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
