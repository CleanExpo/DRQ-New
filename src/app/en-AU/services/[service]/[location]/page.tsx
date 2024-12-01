import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';
import { ServiceFeatures } from '@/components/shared/ServiceFeatures';
import { NearbyLocations } from '@/components/shared/NearbyLocations';
import { ProcessSteps } from '@/components/shared/ProcessSteps';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { FAQ } from '@/components/shared/FAQ';
import { SchemaProvider } from '@/components/SchemaProvider';

interface ServiceContent {
  title: string;
  description: string;
  image: string;
  features: Array<{ title: string; description: string }>;
  steps: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const localizedContent: ServiceContent = {
  title: "Water Damage Restoration",
  description: "Professional water damage restoration services for homes and businesses. Fast response, expert team, and guaranteed results.",
  image: "/images/water-damage-restoration.jpg",
  features: [
    {
      title: "24/7 Emergency Response",
      description: "Immediate assistance when you need it most"
    },
    {
      title: "Advanced Water Extraction",
      description: "Professional grade equipment for efficient water removal"
    },
    {
      title: "Complete Drying Solutions",
      description: "Industrial dehumidifiers and air movers"
    },
    {
      title: "Mould Prevention",
      description: "Treatments to prevent future mould growth"
    }
  ],
  steps: [
    {
      title: "Emergency Contact",
      description: "Call our 24/7 hotline for immediate response"
    },
    {
      title: "Inspection",
      description: "Thorough assessment of water damage"
    },
    {
      title: "Water Extraction",
      description: "Remove standing water and begin drying"
    },
    {
      title: "Drying & Monitoring",
      description: "Complete moisture removal and documentation"
    }
  ],
  faqs: [
    {
      question: "How quickly can you respond to water damage emergencies?",
      answer: "We provide 24/7 emergency response and aim to arrive within 1-2 hours of your call in most service areas."
    },
    {
      question: "What should I do while waiting for your team to arrive?",
      answer: "If safe, turn off the water source, remove valuable items from wet areas, and start removing excess water. Don't enter areas with electrical hazards."
    },
    {
      question: "How long does water damage restoration take?",
      answer: "The timeline varies depending on the extent of damage, typically 3-5 days for drying and basic restoration, longer for extensive repairs."
    }
  ]
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
        title={localizedContent.title}
        description={localizedContent.description}
        image={localizedContent.image}
        imageAlt={`${localizedContent.title} in ${params.location}`}
      >
        <ServiceFeatures features={localizedContent.features} />
        <ProcessSteps steps={localizedContent.steps} />
        <FAQ faqs={localizedContent.faqs} />
        <ServicesOverview />
        <NearbyLocations />
      </ServicePage>
    </SchemaProvider>
  );
}
