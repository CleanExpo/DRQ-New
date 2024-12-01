import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';
import { ServiceFeatures } from '@/components/shared/ServiceFeatures';
import { NearbyLocations } from '@/components/shared/NearbyLocations';
import { ProcessSteps } from '@/components/shared/ProcessSteps';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { FAQ, type FAQItem } from '@/components/shared/FAQ';
import { SchemaProvider } from '@/components/SchemaProvider';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Services | Disaster Recovery QLD',
  description: 'Professional water damage restoration services in Queensland. 24/7 emergency response for flood damage, burst pipes, and water extraction. Call now for immediate help.',
};

const faqs: FAQItem[] = [
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
];

const features = [
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
];

const steps = [
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
];

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

export default function WaterDamagePage() {
  return (
    <SchemaProvider
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Water Damage Restoration",
        provider: {
          "@type": "LocalBusiness",
          name: "Disaster Recovery QLD",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Brisbane",
            addressRegion: "QLD",
            addressCountry: "AU"
          }
        },
        areaServed: {
          "@type": "State",
          name: "Queensland"
        },
        description: "Professional water damage restoration services including flood cleanup, water extraction, and structural drying.",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://disasterrecoveryqld.au/services/water-damage",
          servicePhone: "1300 309 361"
        }
      }}
    >
      <ServicePage
        title="Water Damage Restoration"
        description="Professional water damage restoration services for homes and businesses. Fast response, expert team, and guaranteed results."
        image="/images/water-damage-restoration.jpg"
        imageAlt="Water damage restoration equipment in action"
      >
        <ServiceFeatures features={features} />
        <ProcessSteps steps={steps} />
        <FAQ faqs={faqs} />
        <ServicesOverview title="Other Services" services={otherServices} />
        <NearbyLocations />
      </ServicePage>
    </SchemaProvider>
  );
}
