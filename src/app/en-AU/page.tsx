import { Metadata } from 'next';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { SchemaProvider } from '@/components/SchemaProvider';

export const metadata: Metadata = {
  title: 'Disaster Recovery QLD - Emergency Restoration Services',
  description: 'Professional disaster recovery and restoration services in Queensland. 24/7 emergency response for water damage, flood cleanup, and storm damage repair.',
};

const services = [
  {
    title: "Water Damage",
    description: "Professional water damage restoration services",
    href: "/en-AU/services/water-damage",
    image: "/images/water-damage-restoration.jpg"
  },
  {
    title: "Flood Damage",
    description: "Expert flood cleanup and restoration",
    href: "/en-AU/services/flood-damage",
    image: "/images/flood-damage-cleanup.jpg"
  },
  {
    title: "Mould Remediation",
    description: "Complete mould removal and prevention",
    href: "/en-AU/services/mould-remediation",
    image: "/images/mould-remediation.jpg"
  },
  {
    title: "Storm Damage",
    description: "Emergency storm damage repair services",
    href: "/en-AU/services/storm-damage",
    image: "/images/storm-damage-repair.jpg"
  }
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Disaster Recovery QLD",
    description: "Professional disaster recovery and restoration services in Queensland",
    url: "https://disasterrecoveryqld.au",
    address: {
      "@type": "PostalAddress",
      addressRegion: "QLD",
      addressCountry: "AU"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "1300 309 361",
      contactType: "customer service",
      areaServed: "QLD",
      availableLanguage: "English"
    }
  };

  return (
    <SchemaProvider schema={schema}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Emergency Restoration Services</h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional disaster recovery services across Queensland. Available 24/7 for emergencies.
        </p>
        
        <ServicesOverview 
          title="Our Emergency Services"
          services={services}
        />
      </main>
    </SchemaProvider>
  );
}
