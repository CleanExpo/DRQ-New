export interface LocationImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface LocationAddress {
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export interface NearbyLocation {
  name: string;
  url: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: LocationAddress;
  services: string[];
  nearbyLocations?: NearbyLocation[];
}

export const mainOffice: Location = {
  id: 'wacol',
  name: 'Wacol (Main Office)',
  slug: 'wacol',
  description: 'Our main office and operations center, serving all of Southeast Queensland.',
  address: {
    streetAddress: '17 Tile St',
    suburb: 'Wacol',
    state: 'QLD',
    postcode: '4076',
    country: 'AU'
  },
  services: [
    'water-damage',
    'mould-remediation',
    'sewage-cleanup',
    'storm-damage',
    'fire-damage',
    'crime-scene-cleaning'
  ]
};

export const serviceLocations: Location[] = [
  {
    id: 'brisbane-cbd',
    name: 'Brisbane CBD',
    slug: 'brisbane-cbd',
    description: 'Serving Brisbane CBD and inner city areas with 24/7 emergency response.',
    address: {
      streetAddress: '',
      suburb: 'Brisbane City',
      state: 'QLD',
      postcode: '4000',
      country: 'AU'
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning'
    ]
  },
  {
    id: 'gold-coast',
    name: 'Gold Coast',
    slug: 'gold-coast',
    description: 'Emergency restoration services for the Gold Coast region.',
    address: {
      streetAddress: '',
      suburb: 'Gold Coast',
      state: 'QLD',
      postcode: '4217',
      country: 'AU'
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage'
    ]
  },
  {
    id: 'ipswich',
    name: 'Ipswich',
    slug: 'ipswich',
    description: 'Serving Ipswich and surrounding areas with comprehensive restoration services.',
    address: {
      streetAddress: '',
      suburb: 'Ipswich',
      state: 'QLD',
      postcode: '4305',
      country: 'AU'
    },
    services: [
      'water-damage',
      'mould-remediation',
      'storm-damage',
      'fire-damage'
    ]
  }
];
