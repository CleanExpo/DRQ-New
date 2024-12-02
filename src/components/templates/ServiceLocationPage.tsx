'use client';

import Image from 'next/image';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { ProcessSteps } from '@/components/shared/ProcessSteps';
import { FAQ } from '@/components/shared/FAQ';
import { ServiceFeatures } from '@/components/shared/ServiceFeatures';
import { Location } from '@/types/locations';
import Head from 'next/head';

interface ServiceLocationPageProps {
  service: {
    title: string;
    description: string;
    image: string;
    slug: string;
  };
  location: Location;
}

export function ServiceLocationPage({ service, location }: ServiceLocationPageProps) {
  // Structured data for rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.disasterrecoveryqld.au/en-AU/services/${service.slug}/${location.slug}`,
    name: "Disaster Recovery Queensland",
    image: service.image,
    description: `Professional ${service.title.toLowerCase()} services in ${location.name} and surrounding areas. 24/7 emergency response available.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.streetAddress,
      addressLocality: location.address.suburb,
      addressRegion: location.address.state,
      postalCode: location.address.postcode,
      addressCountry: "AU"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude
    },
    url: `https://www.disasterrecoveryqld.au/en-AU/services/${service.slug}/${location.slug}`,
    telephone: "1300309361",
    areaServed: location.serviceArea?.join(", "),
    serviceType: service.title,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00"
    },
    availabilityStarts: "00:00",
    availabilityEnds: "23:59",
    priceRange: "$$"
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{`${service.title} in ${location.name} | Disaster Recovery QLD`}</title>
        <meta name="title" content={`${service.title} in ${location.name} | Disaster Recovery QLD`} />
        <meta name="description" content={`Professional ${service.title.toLowerCase()} services in ${location.name}. 24/7 emergency response, expert technicians, and guaranteed satisfaction. Call 1300 309 361.`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.disasterrecoveryqld.au/en-AU/services/${service.slug}/${location.slug}`} />
        <meta property="og:title" content={`${service.title} in ${location.name} | Disaster Recovery QLD`} />
        <meta property="og:description" content={`Professional ${service.title.toLowerCase()} services in ${location.name}. 24/7 emergency response, expert technicians, and guaranteed satisfaction.`} />
        <meta property="og:image" content={service.image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.disasterrecoveryqld.au/en-AU/services/${service.slug}/${location.slug}`} />
        <meta property="twitter:title" content={`${service.title} in ${location.name} | Disaster Recovery QLD`} />
        <meta property="twitter:description" content={`Professional ${service.title.toLowerCase()} services in ${location.name}. 24/7 emergency response, expert technicians, and guaranteed satisfaction.`} />
        <meta property="twitter:image" content={service.image} />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href={`https://www.disasterrecoveryqld.au/en-AU/services/${service.slug}/${location.slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700" role="banner" aria-label="Page Header">
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={`${service.title} services in ${location.name}`}
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {service.title} in {location.name}
              </h1>
              <p className="text-xl text-white/90">
                Professional {service.title.toLowerCase()} services in {location.name} and surrounding areas.
                24/7 emergency response available.
              </p>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="py-16 bg-gray-50" aria-label="Service Features">
          <div className="container mx-auto px-4">
            <ServiceFeatures service={service.slug} />
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16" aria-label="Service Process">
          <div className="container mx-auto px-4">
            <ProcessSteps />
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50" aria-label="Service Area Map">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Service Area</h2>
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <GoogleMap
                  center={{
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude
                  }}
                  zoom={12}
                  markers={[
                    {
                      position: {
                        lat: location.coordinates.latitude,
                        lng: location.coordinates.longitude
                      },
                      title: location.name
                    }
                  ]}
                />
              </div>
              <p className="mt-6 text-center text-gray-600">
                We provide {service.title.toLowerCase()} services in {location.name} and surrounding suburbs
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16" aria-label="Frequently Asked Questions">
          <div className="container mx-auto px-4">
            <FAQ service={service.slug} />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50" aria-label="Contact Information">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need Emergency Service in {location.name}?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team is available 24/7 for emergency {service.title.toLowerCase()} in {location.name} and surrounding areas.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
                  aria-label="Call our emergency service number"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg font-semibold">Call 1300 309 361</span>
                </a>
                <a
                  href="/en-AU/quote"
                  className="inline-flex items-center justify-center space-x-2 bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary/90 transition-colors"
                  aria-label="Get a service quote"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-lg font-semibold">Get a Quote</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
