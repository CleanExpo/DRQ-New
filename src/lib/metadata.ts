import { Metadata } from 'next';

interface ServiceContent {
  title: string;
  description: string;
  image?: string;
}

export function generateServiceMetadata(service: ServiceContent): Metadata {
  const title = `${service.title} Brisbane | Disaster Recovery QLD`;
  const description = `Professional ${service.title.toLowerCase()} services available 24/7. ${service.description} in Brisbane and surrounding areas.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(service.image && {
        images: [{
          url: service.image,
          width: 1200,
          height: 630,
          alt: title
        }]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(service.image && {
        images: [service.image]
      })
    }
  };
}

interface LocationContent {
  name: string;
  description?: string;
  image?: string;
}

export function generateLocationMetadata(location: LocationContent): Metadata {
  const title = `Emergency Restoration Services in ${location.name} | DRQ`;
  const description = location.description || 
    `Professional disaster recovery and restoration services in ${location.name}. 24/7 emergency response for water damage, fire damage, and mould remediation.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(location.image && {
        images: [{
          url: location.image,
          width: 1200,
          height: 630,
          alt: title
        }]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(location.image && {
        images: [location.image]
      })
    }
  };
}
