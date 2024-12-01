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

const content: ServiceContent = {
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
    }
  ],
  faqs: [
    {
      question: "How quickly can you respond?",
      answer: "We provide 24/7 emergency response and aim to arrive within 1-2 hours."
    }
  ]
};

const otherServices = [
  {
    title: "Fire Damage Restoration",
    description: "Expert fire and smoke damage restoration services",
    image: "/images/fire-damage.jpg",
    href: "/en-AU/services/fire-damage"
  },
  {
    title: "Mould Remediation",
    description: "Professional mould removal and prevention",
    image: "/images/mould-remediation.jpg",
    href: "/en-AU/services/mould-remediation"
  },
  {
    title: "Storm Damage Repair",
    description: "Comprehensive storm damage restoration services",
    image: "/images/storm-damage.jpg",
    href: "/en-AU/services/storm-damage"
  }
];

export default function ServiceDetailPage({ params }: { params: { service: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    provider: {
      "@type": "LocalBusiness",
      name: "Disaster Recovery QLD"
    },
    description: content.description
  };

  return (
    <SchemaProvider schema={schema}>
      <ServicePage
        title={content.title}
        description={content.description}
        image={content.image}
        imageAlt={`${content.title} services`}
      >
        <ServiceFeatures features={content.features} />
        <ProcessSteps steps={content.steps} />
        <FAQ faqs={content.faqs} />
        <ServicesOverview title="Other Services" services={otherServices} />
        <NearbyLocations title="Service Areas" />
      </ServicePage>
    </SchemaProvider>
  );
}
