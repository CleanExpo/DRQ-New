import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';
import { SchemaProvider } from '@/components/SchemaProvider';

interface ServiceContent {
  title: string;
  description: string;
  image: string;
}

const localizedContent: ServiceContent = {
  title: "Water Damage Restoration",
  description: "Professional water damage restoration services for homes and businesses. Fast response, expert team, and guaranteed results.",
  image: "/images/water-damage-restoration.jpg"
};

export default function ServiceLocationPage({ params }: { params: { service: string; location: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: localizedContent.title,
    provider: {
      "@type": "LocalBusiness",
      name: "Disaster Recovery QLD",
      address: {
        "@type": "PostalAddress",
        addressLocality: params.location,
        addressRegion: "QLD",
        addressCountry: "AU"
      }
    },
    areaServed: {
      "@type": "City",
      name: params.location
    },
    description: localizedContent.description
  };

  return (
    <SchemaProvider schema={schema}>
      <ServicePage
        title={`${localizedContent.title} in ${params.location}`}
        description={localizedContent.description}
        image={localizedContent.image}
        imageAlt={`${localizedContent.title} services in ${params.location}`}
      >
        <div>Content coming soon...</div>
      </ServicePage>
    </SchemaProvider>
  );
}
