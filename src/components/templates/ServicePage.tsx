'use client';

import Image from 'next/image';
import { ServiceFeatures } from '@/components/shared/ServiceFeatures';
import { ProcessSteps } from '@/components/shared/ProcessSteps';
import { FAQ } from '@/components/shared/FAQ';
import { NearbyLocations } from '@/components/shared/NearbyLocations';

interface ServicePageProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export function ServicePage({ title, description, image, slug }: ServicePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-white/90">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceFeatures service={slug} />
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProcessSteps />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FAQ service={slug} />
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NearbyLocations title="Service Areas" />
        </div>
      </section>
    </div>
  );
}
