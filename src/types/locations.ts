export interface Location {
  id: string;
  slug: string;
  name: string;
  state: string;
  postcode: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services?: string[];
  nearbyLocations?: string[];
  schema?: {
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
}

export interface LocationPageProps {
  location: Location;
  services: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
  }>;
  nearbyLocations: Location[];
}

export interface LocationData {
  id: string;
  slug: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services?: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
  }>;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ServiceArea {
  name: string;
  coordinates: Coordinates;
  radius: number; // in kilometers
}

export interface ServiceAreaProps {
  center: Coordinates;
  areas: ServiceArea[];
  zoom?: number;
}
