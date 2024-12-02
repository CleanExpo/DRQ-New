export interface LocationImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  blurDataURL?: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string | LocationImage;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  services: string[];
  serviceArea?: string[];
  address: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}

export interface NearbyLocation {
  name: string;
  slug: string;
  distance: number;
}

export const serviceLocations = [
  'brisbane-cbd',
  'inner-brisbane',
  'west-brisbane',
  'south-brisbane',
  'east-brisbane',
  'gold-coast',
  'gold-coast-hinterlands',
  'ipswich',
  'ipswich-country',
  'summerset',
  'lockyer-valley',
  'toowoomba-range',
  'scenic-rim',
  'redland-shire',
  'logan-city',
  'logan-village'
] as const;

export type ServiceLocation = typeof serviceLocations[number];
