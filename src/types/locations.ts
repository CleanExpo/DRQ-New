export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  address: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  services: string[];
  nearbyLocations?: {
    name: string;
    url: string;
    description: string;
  }[];
}

export interface LocationImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
}

export interface LocationContent {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  image?: LocationImage;
  location: Location;
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
