export interface LocationImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
}

export interface LocationAddress {
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface NearbyLocation {
  name: string;
  distance: number;
  slug: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: LocationAddress;
  coordinates: Coordinates;
  services: string[];
  nearbyLocations?: NearbyLocation[];
  image?: string | LocationImage;
  serviceArea?: string[];
}

// Main office location
export const mainOffice: Location = {
  id: 'wacol',
  name: 'Wacol (Main Office)',
  slug: 'wacol',
  description: 'Our main office providing professional restoration services across Southeast Queensland',
  address: {
    streetAddress: '17 Tile St',
    suburb: 'Wacol',
    state: 'QLD',
    postcode: '4076'
  },
  coordinates: {
    latitude: -27.4698,
    longitude: 153.0251
  },
  services: [
    'water-damage',
    'flood-damage',
    'mould-remediation',
    'storm-damage',
    'sewage-cleanup'
  ],
  serviceArea: [
    'Inner Brisbane',
    'Western Brisbane',
    'Southern Brisbane',
    'Eastern Brisbane'
  ]
};

// All service locations including main office and satellite locations
export const serviceLocations: Location[] = [
  mainOffice,
  {
    id: 'brisbane-cbd',
    name: 'Brisbane CBD',
    slug: 'brisbane-cbd',
    description: 'Servicing Brisbane\'s central business district and inner suburbs',
    address: {
      streetAddress: '123 Adelaide St',
      suburb: 'Brisbane City',
      state: 'QLD',
      postcode: '4000'
    },
    coordinates: {
      latitude: -27.4705,
      longitude: 153.0260
    },
    services: [
      'water-damage',
      'flood-damage',
      'mould-remediation',
      'storm-damage',
      'sewage-cleanup'
    ],
    serviceArea: [
      'Brisbane CBD',
      'Fortitude Valley',
      'Spring Hill',
      'South Brisbane'
    ]
  },
  {
    id: 'gold-coast',
    name: 'Gold Coast',
    slug: 'gold-coast',
    description: 'Expert restoration services for the Gold Coast region',
    address: {
      streetAddress: '123 Gold Coast Hwy',
      suburb: 'Southport',
      state: 'QLD',
      postcode: '4215'
    },
    coordinates: {
      latitude: -28.0167,
      longitude: 153.4000
    },
    services: [
      'water-damage',
      'flood-damage',
      'mould-remediation',
      'storm-damage',
      'sewage-cleanup'
    ],
    serviceArea: [
      'Southport',
      'Surfers Paradise',
      'Broadbeach',
      'Robina'
    ]
  },
  {
    id: 'logan-city',
    name: 'Logan City',
    slug: 'logan-city',
    description: 'Comprehensive restoration services in Logan and surrounding areas',
    address: {
      streetAddress: '456 Logan Rd',
      suburb: 'Logan Central',
      state: 'QLD',
      postcode: '4114'
    },
    coordinates: {
      latitude: -27.6389,
      longitude: 153.1067
    },
    services: [
      'water-damage',
      'flood-damage',
      'mould-remediation',
      'storm-damage',
      'sewage-cleanup'
    ],
    serviceArea: [
      'Logan Central',
      'Springwood',
      'Woodridge',
      'Beenleigh'
    ]
  }
];

// Helper function to convert degrees to radians
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Helper function to calculate distance between coordinates in kilometers
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Helper function to get nearby locations
export function getNearbyLocations(locationId: string): NearbyLocation[] {
  const location = serviceLocations.find(loc => loc.id === locationId);
  if (!location) return [];

  return serviceLocations
    .filter(loc => loc.id !== locationId)
    .map(loc => {
      const distance = calculateDistance(
        location.coordinates.latitude,
        location.coordinates.longitude,
        loc.coordinates.latitude,
        loc.coordinates.longitude
      );
      return {
        name: loc.name,
        distance,
        slug: loc.slug
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
}
