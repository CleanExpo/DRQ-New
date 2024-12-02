'use client';

import { LocationHero } from '@/components/location/LocationHero';
import { LocationImage } from '@/components/location/LocationImage';
import { LocationContact } from '@/components/location/LocationContact';
import { ServicesOverview } from '@/components/shared/ServicesOverview';
import { ProcessSteps } from '@/components/shared/ProcessSteps';
import { FAQ } from '@/components/shared/FAQ';
import { getServices } from '@/lib/services';
import { Location, LocationImage as LocationImageType } from '@/types/locations';

interface LocationPageProps {
  location: Location;
  image?: LocationImageType;
}

export function LocationPage({ location, image }: LocationPageProps) {
  const services = getServices().map(service => ({
    title: service.title,
    description: service.description,
    image: service.image,
    href: `/en-AU/services/${service.slug}/${location.slug}`
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <LocationHero location={location} />

      {/* Location Image */}
      {image && <LocationImage image={image} />}

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ServicesOverview
            title={`Our Services in ${location.name}`}
            services={services}
          />
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ProcessSteps />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FAQ service="default" />
        </div>
      </section>

      {/* Contact Section */}
      <LocationContact location={location} />
    </div>
  );
}
