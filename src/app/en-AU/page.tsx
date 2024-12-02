import { Metadata } from 'next';
import { HomePage } from '@/components/templates/HomePage';
import { SchemaProvider } from '@/components/SchemaProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://disasterrecoveryqld.au'),
  title: 'Disaster Recovery QLD - Emergency Water Damage Restoration Services',
  description: 'Professional water damage restoration services in Queensland. 24/7 emergency response for flood cleanup, mould remediation, and storm damage repair.',
  openGraph: {
    type: 'website',
    url: 'https://disasterrecoveryqld.au',
    title: 'Disaster Recovery QLD - Emergency Water Damage Restoration Services',
    description: 'Professional water damage restoration services in Queensland. 24/7 emergency response for flood cleanup, mould remediation, and storm damage repair.',
    siteName: 'Disaster Recovery QLD',
    images: [
      {
        url: '/images/water-damage-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Water Damage Restoration Services',
      },
    ],
  },
};

export default function Page() {
  const organizationSchema = {
    '@type': 'Organization',
    name: 'Disaster Recovery QLD',
    url: 'https://disasterrecoveryqld.au',
    logo: 'https://disasterrecoveryqld.au/images/logo.png',
    description: 'Professional water damage restoration services in Queensland.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17 Tile St',
      addressLocality: 'Wacol',
      addressRegion: 'QLD',
      postalCode: '4076',
      addressCountry: 'AU'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '1300309361',
      contactType: 'customer service',
      areaServed: 'Queensland',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.facebook.com/disasterrecoveryqld',
      'https://www.linkedin.com/company/disaster-recovery-qld'
    ]
  };

  return (
    <>
      <SchemaProvider data={organizationSchema} />
      <HomePage />
    </>
  );
}
