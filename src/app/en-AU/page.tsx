import { Metadata } from 'next';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { SchemaProvider } from '@/components/SchemaProvider';
import { NearbyLocations } from '@/components/shared/NearbyLocations';

export const metadata: Metadata = {
  title: 'Disaster Recovery QLD - Emergency Restoration Services',
  description: 'Professional disaster recovery and restoration services in Queensland. 24/7 emergency response for water damage, flood cleanup, and storm damage repair.',
};

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Disaster Recovery QLD",
    description: "Professional disaster recovery and restoration services in Queensland",
    url: "https://disasterrecoveryqld.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "17 Tile St",
      addressLocality: "Wacol",
      addressRegion: "QLD",
      postalCode: "4076",
      addressCountry: "AU"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "1300 309 361",
      contactType: "customer service",
      areaServed: "QLD",
      availableLanguage: "English",
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          description: "On-call service available"
        }
      ]
    },
    email: "admin@disasterrecoveryqld.au",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00"
      }
    ],
    specialOpeningHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "24/7 Emergency Service Available"
    }
  };

  return (
    <SchemaProvider schema={schema}>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Restoration Services</h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional disaster recovery services across Southeast Queensland. Available 24/7 for emergencies.
          </p>
          
          <div className="bg-primary/10 rounded-lg p-6 mb-12">
            <p className="font-semibold text-lg mb-2">24/7 Emergency Service</p>
            <a href="tel:1300309361" className="text-2xl font-bold text-primary hover:underline">
              1300 309 361
            </a>
          </div>
        </div>
        
        <ServicesOverview title="Our Emergency Services" />
        <NearbyLocations title="Service Areas" />
      </main>
    </SchemaProvider>
  );
}
