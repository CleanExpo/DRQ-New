'use client';

import { SchemaProvider } from '@/components/SchemaProvider';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { NearbyLocations } from '@/components/shared/NearbyLocations';
import { ProcessSteps } from '@/components/shared/ProcessSteps';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { getServices } from '@/lib/services';
import { mainOffice } from '@/types/locations';

const processSteps = [
  {
    title: "24/7 Emergency Response",
    description: "Our team is available 24/7 to respond to your emergency. We'll be on-site within 60 minutes of your call."
  },
  {
    title: "Assessment & Planning",
    description: "We conduct a thorough assessment of the damage and develop a comprehensive restoration plan."
  },
  {
    title: "Professional Restoration",
    description: "Our certified technicians execute the restoration plan using industry-leading equipment and techniques."
  },
  {
    title: "Quality Assurance",
    description: "We perform detailed quality checks to ensure all restoration work meets our high standards."
  },
  {
    title: "Final Inspection",
    description: "A final walkthrough is conducted to ensure your complete satisfaction with our services."
  }
];

export function HomePage() {
  const servicesData = getServices();
  const services = servicesData.map(service => ({
    title: service.title,
    description: service.description,
    image: service.image,
    href: `/en-AU/services/${service.slug}`
  }));

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
    }
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SchemaProvider schema={schema}>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Emergency Restoration Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Professional disaster recovery services across Southeast Queensland. Available 24/7 for emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Call Now: 1300 309 361
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                onClick={handleServicesClick}
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Bar */}
      <section className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="font-semibold mb-2 sm:mb-0">
              24/7 Emergency Response Available
            </p>
            <a
              href="tel:1300309361"
              className="text-xl font-bold hover:underline"
            >
              1300 309 361
            </a>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <ServicesOverview title="Our Emergency Services" services={services} />
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* Map and Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Location</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <GoogleMap
                  latitude={mainOffice.coordinates.latitude}
                  longitude={mainOffice.coordinates.longitude}
                  zoom={14}
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p>{mainOffice.address.streetAddress}</p>
                    <p>{mainOffice.address.suburb}, {mainOffice.address.state} {mainOffice.address.postcode}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Hours</h3>
                    <p>Monday - Friday: 8am - 4pm</p>
                    <p>Saturday - Sunday: On-call</p>
                    <p className="text-primary font-semibold">24/7 Emergency Service Available</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Contact</h3>
                    <p>Phone: <a href="tel:1300309361" className="text-primary hover:underline">1300 309 361</a></p>
                    <p>Email: <a href="mailto:admin@disasterrecoveryqld.au" className="text-primary hover:underline">admin@disasterrecoveryqld.au</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NearbyLocations title="Service Areas" />
        </div>
      </section>
    </SchemaProvider>
  );
}
