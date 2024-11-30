import React from 'react';
import { Hero } from '../shared/Hero';
import { ServicesOverview } from '../shared/ServicesOverview';
import { ProcessSteps } from '../shared/ProcessSteps';
import { FAQ } from '../shared/FAQ';
import { CallToAction } from '../shared/CallToAction';
import { ServiceAreas } from '../shared/ServiceAreas';
import { SchemaProvider } from '../SchemaProvider';

interface ServiceFeature {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceContent {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  featureDescriptions: { [key: string]: string };
  process: string[];
  processDescriptions: { [key: string]: string };
  faqs: FAQItem[];
  image?: string;
  schema: {
    service: {
      "@type": string;
      name: string;
      provider: {
        "@type": string;
        name: string;
      };
      areaServed: string;
      description: string;
    };
  };
}

interface ServicePageProps {
  service: ServiceContent;
  slug: string;
}

export default function ServicePage({ service, slug }: ServicePageProps) {
  const services: ServiceFeature[] = service.features.map(feature => ({
    title: feature,
    description: service.featureDescriptions[feature]
  }));

  const steps: ProcessStep[] = service.process.map((step, index) => ({
    step: (index + 1).toString(),
    title: step,
    description: service.processDescriptions[step]
  }));

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/en-AU/services/${slug}` }
  ];

  return (
    <>
      <SchemaProvider 
        schemas={[
          {
            "@context": "https://schema.org",
            ...service.schema.service
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": `https://disasterrecoveryqld.au${item.url}`
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": service.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]} 
      />
      <div className="flex flex-col gap-12 py-8">
        {/* Hero Section */}
        <Hero 
          title={`Professional ${service.title}`}
          description={service.description}
          primaryButton={{
            text: "Get Emergency Help",
            href: "/en-AU/contact"
          }}
          secondaryButton={{
            text: "Contact Us",
            href: "/en-AU/contact"
          }}
          image={service.image}
        />

        {/* Services Overview */}
        <ServicesOverview 
          title={`Our ${service.title} Services`}
          services={services}
        />

        {/* Process Steps */}
        <ProcessSteps 
          title="Our Professional Process"
          steps={steps}
        />

        {/* FAQ Section */}
        <FAQ 
          title={`Common Questions About ${service.title}`}
          faqs={service.faqs}
        />

        {/* Call to Action */}
        <CallToAction 
          title={`Need Emergency ${service.title}?`}
          description="Our team is available 24/7 for emergency response across South East Queensland"
          buttonText="Contact Us Now"
          buttonHref="/en-AU/contact"
          showPhoneNumber={true}
          isDark={true}
        />

        {/* Service Areas */}
        <ServiceAreas />
      </div>
    </>
  );
}
