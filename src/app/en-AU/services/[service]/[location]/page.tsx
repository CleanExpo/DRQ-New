import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';
import { getServiceContent } from '@/lib/services';
import { getLocationBySlug } from '@/lib/locations';
import { getServiceImage, getLocationImage, generateImageMetadata } from '@/lib/images';
import { Location, LocationImage } from '@/types/locations';
import { ServiceContent } from '@/types/services';

interface ServiceLocationPageParams {
  service: string;
  location: string;
}

export async function generateMetadata({ params }: { params: ServiceLocationPageParams }): Promise<Metadata> {
  const serviceContent = getServiceContent(params.service);
  const location = getLocationBySlug(params.location);
  const locationImage = location?.image ? generateImageMetadata(location.image, location.name) : null;
  const serviceImage = getServiceImage(params.service);

  const title = `${serviceContent.title} in ${location?.name || 'Your Area'}`;
  const description = `Professional ${serviceContent.title.toLowerCase()} services in ${location?.name || 'your area'}. ${serviceContent.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: locationImage?.url || serviceImage,
          width: locationImage?.width || 1200,
          height: locationImage?.height || 630,
          alt: locationImage?.alt || title,
        },
      ],
    },
  };
}

export default function ServiceLocationPage({ params }: { params: ServiceLocationPageParams }) {
  const serviceContent = getServiceContent(params.service);
  const location = getLocationBySlug(params.location);
  const locationImage = location?.image ? generateImageMetadata(location.image, location.name) : null;
  const serviceImage = getServiceImage(params.service);

  if (!location) {
    return null; // 404 will be handled by Next.js
  }

  // Get nearby locations that offer this service
  const nearbyLocations = location.nearbyLocations?.filter(nearby => 
    getLocationBySlug(nearby.url.split('/').pop()!)?.services.includes(params.service)
  ) || [];

  const localizedContent: ServiceContent = {
    title: `${serviceContent.title} in ${location.name}`,
    description: `Professional ${serviceContent.title.toLowerCase()} services in ${location.name}. ${serviceContent.description}`,
    image: locationImage?.url || serviceImage,
    features: serviceContent.features,
    location,
    nearbyLocations,
    schema: {
      service: {
        "@type": "Service",
        name: serviceContent.title,
        description: `Professional ${serviceContent.title.toLowerCase()} services in ${location.name}`,
        provider: {
          "@type": "LocalBusiness",
          name: "Disaster Recovery Queensland",
          address: {
            "@type": "PostalAddress",
            streetAddress: location.address.streetAddress,
            addressLocality: location.address.suburb,
            addressRegion: location.address.state,
            postalCode: location.address.postcode,
            addressCountry: location.address.country,
          },
        },
        areaServed: {
          "@type": "City",
          name: location.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: location.address.suburb,
            addressRegion: location.address.state,
            postalCode: location.address.postcode,
            addressCountry: location.address.country,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
          },
        },
      },
    },
  };

  return <ServicePage service={localizedContent} slug={params.service} />;
}
