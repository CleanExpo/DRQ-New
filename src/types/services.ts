import { Location } from './locations';

export interface ServiceContent {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
  features: readonly string[];
  location?: Location;
  nearbyLocations?: {
    name: string;
    url: string;
    description: string;
  }[];
  schema?: {
    service: {
      "@type": string;
      name: string;
      description: string;
      provider: {
        "@type": string;
        name: string;
        address: {
          "@type": string;
          streetAddress: string;
          addressLocality: string;
          addressRegion: string;
          postalCode: string;
          addressCountry: string;
        };
      };
      areaServed: {
        "@type": string;
        name: string;
        address: {
          "@type": string;
          addressLocality: string;
          addressRegion: string;
          postalCode: string;
          addressCountry: string;
        };
        geo: {
          "@type": string;
          latitude: number;
          longitude: number;
        };
      };
    };
  };
}

export interface ServicePageProps {
  service: ServiceContent;
  slug: string;
}

export interface ServiceLocation {
  name: string;
  url: string;
  description: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: readonly string[];
  image: string;
  locations?: ServiceLocation[];
}
