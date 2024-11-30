import React from 'react';
import { Hero } from '@/components/shared/Hero';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { ServiceAreas } from '@/components/shared/ServiceAreas';
import { CallToAction } from '@/components/shared/CallToAction';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <Hero 
        title="Professional Disaster Recovery Services"
        description="24/7 emergency restoration services in South East Queensland"
        primaryButton={{
          text: "Get Emergency Help",
          href: "/en-AU/contact"
        }}
        secondaryButton={{
          text: "Our Services",
          href: "/en-AU/services"
        }}
      />

      <ServicesOverview 
        title="Our Emergency Services"
        services={[
          {
            title: "Water Damage",
            description: "Professional water damage restoration services",
            href: "/en-AU/services/water-damage"
          },
          {
            title: "Fire Damage",
            description: "Expert fire and smoke damage recovery",
            href: "/en-AU/services/fire-damage"
          },
          {
            title: "Mould Remediation",
            description: "Professional mould removal and prevention",
            href: "/en-AU/services/mould-remediation"
          }
        ]}
      />

      <ServiceAreas />

      <CallToAction 
        title="Need Emergency Services?"
        description="Our team is available 24/7 for rapid response"
        buttonText="Contact Us Now"
        buttonHref="/en-AU/contact"
        showPhoneNumber={true}
        isDark={true}
      />
    </div>
  );
}
