import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICE_CONTENT } from '@/config/content';
import { LOCATIONS, getNearbyLocations } from '@/config/locations';
import ServicePage from '@/components/templates/ServicePage';
import { getLocationImage } from '@/lib/images';

interface LocationServicePageProps {
  params: {
    service: string;
    location: string;
  };
}

export async function generateMetadata({ params }: LocationServicePageProps): Promise<Metadata> {
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const serviceContent = SERVICE_CONTENT[serviceKey];
  const location = LOCATIONS[params.location];
  
  if (!serviceContent || !location) return {};
  
  const title = `${serviceContent.title} in ${location.name}, ${location.region} | DRQ`;
  const description = location.metaDescription || 
    `Professional ${serviceContent.title.toLowerCase()} services in ${location.name}, ${location.region}. 24/7 emergency response for ${location.suburbs?.slice(0, 3).join(', ')} and surrounding areas.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: serviceContent.image || '/images/og-image.jpg' }]
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en-AU/services/${params.service}/${params.location}`
    }
  };
}

export default async function LocationServicePage({ params }: LocationServicePageProps) {
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const serviceContent = SERVICE_CONTENT[serviceKey];
  const location = LOCATIONS[params.location];
  
  if (!serviceContent || !location) {
    notFound();
  }

  // Get location-specific image
  const locationImage = await getLocationImage(location.name);

  // Get nearby locations for internal linking
  const nearbyLocations = getNearbyLocations(params.location, 3);

  // Customize content for location
  const localizedContent = {
    ...serviceContent,
    title: `${serviceContent.title} in ${location.name}`,
    description: `Professional ${serviceContent.title.toLowerCase()} services in ${location.name} and surrounding areas including ${location.suburbs?.slice(0, 3).join(', ')}. Available 24/7 for emergency response.`,
    image: locationImage?.url || serviceContent.image,
    location: location,
    nearbyLocations: nearbyLocations.map(nearby => ({
      name: nearby.name,
      url: `/en-AU/services/${params.service}/${nearby.slug}`,
      description: `${serviceContent.title} services also available in ${nearby.name}`
    })),
    schema: {
      ...serviceContent.schema,
      service: {
        ...serviceContent.schema.service,
        areaServed: {
          "@type": "City",
          name: location.name,
          address: {
            "@type": "PostalAddress",
            addressRegion: location.state,
            postalCode: location.postcode,
            addressCountry: "AU"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng
          }
        },
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng
          },
          geoRadius: "50000"
        }
      },
      localBusiness: {
        "@type": "LocalBusiness",
        name: "Disaster Recovery Queensland",
        image: locationImage?.url || serviceContent.image,
        address: {
          "@type": "PostalAddress",
          addressLocality: location.name,
          addressRegion: location.state,
          postalCode: location.postcode,
          addressCountry: "AU"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng
        },
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/en-AU/services/${params.service}/${params.location}`,
        telephone: "+61-1300-000-000",
        priceRange: "$$",
        areaServed: location.suburbs?.map(suburb => ({
          "@type": "City",
          name: suburb
        }))
      }
    }
  };

  return <ServicePage 
    service={localizedContent} 
    slug={`${params.service}/${params.location}`}
  />;
}

// Generate static paths for all service-location combinations
export async function generateStaticParams() {
  const paths: { service: string; location: string; }[] = [];
  
  Object.keys(SERVICE_CONTENT).forEach(service => {
    Object.keys(LOCATIONS).forEach(location => {
      paths.push({
        service: service.toLowerCase().replace(/_/g, '-'),
        location: location
      });
    });
  });
  
  return paths;
}
