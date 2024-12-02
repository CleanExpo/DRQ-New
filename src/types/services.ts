export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  locations?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface ServiceContent {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  features: string[];
  content?: string;
  schema: {
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
