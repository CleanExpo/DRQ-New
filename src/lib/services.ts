import { ServiceContent, ServiceData } from '@/types/services';

const services: ServiceData[] = [
  {
    id: 'water-damage',
    slug: 'water-damage',
    title: 'Water Damage Restoration',
    description: 'Professional water damage restoration services with rapid response',
    features: [
      'Flood Damage Cleanup',
      'Burst Pipe Repairs',
      'Storm Damage',
      'Structural Drying',
      'Moisture Detection',
      'Content Restoration'
    ],
    image: '/images/water-damage-restoration.jpg'
  },
  {
    id: 'flood-damage',
    slug: 'flood-damage',
    title: 'Flood Damage Cleanup',
    description: 'Expert flood damage cleanup and restoration services',
    features: [
      'Water Extraction',
      'Structural Drying',
      'Sanitization',
      'Mould Prevention',
      'Content Recovery',
      'Insurance Assistance'
    ],
    image: '/images/flood-damage-cleanup.jpg'
  },
  {
    id: 'mould-remediation',
    slug: 'mould-remediation',
    title: 'Mould Remediation',
    description: 'Professional mould removal and remediation services',
    features: [
      'Mould Inspection',
      'Safe Removal',
      'Root Cause Analysis',
      'Prevention Measures',
      'Air Quality Testing',
      'Structural Treatment'
    ],
    image: '/images/mould-remediation.jpg'
  }
];

const serviceContent: Record<string, ServiceContent> = {
  'water-damage': {
    title: 'Water Damage Restoration',
    description: 'Professional water damage restoration services with rapid response',
    metaTitle: 'Water Damage Restoration Services Brisbane | DRQ',
    metaDescription: 'Expert water damage restoration in Brisbane. 24/7 emergency response, professional service, and guaranteed results. Call now for immediate assistance.',
    image: '/images/water-damage-restoration.jpg',
    features: [
      'Flood Damage Cleanup',
      'Burst Pipe Repairs',
      'Storm Damage',
      'Structural Drying',
      'Moisture Detection',
      'Content Restoration'
    ],
    schema: {
      service: {
        "@type": "Service",
        name: "Water Damage Restoration",
        description: "Professional water damage restoration services with rapid response",
        provider: {
          "@type": "LocalBusiness",
          name: "Disaster Recovery Queensland",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Example St",
            addressLocality: "Brisbane",
            addressRegion: "QLD",
            postalCode: "4000",
            addressCountry: "AU"
          }
        },
        areaServed: {
          "@type": "City",
          name: "Brisbane",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Brisbane",
            addressRegion: "QLD",
            postalCode: "4000",
            addressCountry: "AU"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -27.4698,
            longitude: 153.0251
          }
        }
      }
    }
  }
};

export function getServices(): ServiceData[] {
  return services;
}

export function getService(slug: string): ServiceData | undefined {
  return services.find(service => service.slug === slug);
}

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}

export function getServicesByLocation(locationSlug: string): ServiceData[] {
  // In a real app, this would filter based on location availability
  return services;
}

export function getRelatedServices(currentSlug: string, limit = 3): ServiceData[] {
  return services
    .filter(service => service.slug !== currentSlug)
    .slice(0, limit);
}
