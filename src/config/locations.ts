export interface Location {
  name: string;
  slug: string;
  region: string;
  state: string;
  postcode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  metaDescription?: string;
  suburbs?: string[];
  population?: number;
  servicesOffered?: string[];
}

export const LOCATIONS: { [key: string]: Location } = {
  'brisbane': {
    name: 'Brisbane',
    slug: 'brisbane',
    region: 'Brisbane Metropolitan',
    state: 'QLD',
    postcode: '4000',
    coordinates: { lat: -27.4698, lng: 153.0251 },
    metaDescription: 'Professional disaster recovery services in Brisbane. 24/7 emergency response for water damage, fire damage, and mould remediation.',
    suburbs: [
      'Brisbane CBD',
      'South Brisbane',
      'West End',
      'Fortitude Valley',
      'New Farm',
      'Paddington',
      'Red Hill',
      'Spring Hill',
      'Kangaroo Point'
    ],
    population: 2560720,
    servicesOffered: [
      'Water Damage Restoration',
      'Fire Damage Recovery',
      'Mould Remediation',
      'Storm Damage Repair',
      'Emergency Response'
    ]
  },
  'gold-coast': {
    name: 'Gold Coast',
    slug: 'gold-coast',
    region: 'South East Queensland',
    state: 'QLD',
    postcode: '4217',
    coordinates: { lat: -28.0167, lng: 153.4000 },
    metaDescription: 'Expert disaster recovery services on the Gold Coast. Available 24/7 for water damage, fire damage, and mould remediation emergencies.',
    suburbs: [
      'Surfers Paradise',
      'Broadbeach',
      'Main Beach',
      'Southport',
      'Robina',
      'Burleigh Heads',
      'Palm Beach',
      'Coolangatta'
    ],
    population: 679127,
    servicesOffered: [
      'Water Damage Restoration',
      'Fire Damage Recovery',
      'Mould Remediation',
      'Storm Damage Repair',
      'Emergency Response'
    ]
  },
  'ipswich': {
    name: 'Ipswich',
    slug: 'ipswich',
    region: 'South East Queensland',
    state: 'QLD',
    postcode: '4305',
    coordinates: { lat: -27.6167, lng: 152.7667 },
    metaDescription: 'Professional disaster recovery services in Ipswich. Fast response times for all emergency restoration needs.',
    suburbs: [
      'Ipswich CBD',
      'Booval',
      'Bundamba',
      'Goodna',
      'Redbank',
      'Ripley',
      'Springfield Lakes'
    ],
    population: 233301,
    servicesOffered: [
      'Water Damage Restoration',
      'Fire Damage Recovery',
      'Mould Remediation',
      'Storm Damage Repair',
      'Emergency Response'
    ]
  },
  'logan': {
    name: 'Logan',
    slug: 'logan',
    region: 'South East Queensland',
    state: 'QLD',
    postcode: '4114',
    coordinates: { lat: -27.6389, lng: 153.1067 },
    metaDescription: 'Trusted disaster recovery services in Logan. 24/7 emergency response for all restoration services.',
    suburbs: [
      'Logan Central',
      'Beenleigh',
      'Springwood',
      'Shailer Park',
      'Daisy Hill',
      'Rochedale South',
      'Woodridge'
    ],
    population: 341985,
    servicesOffered: [
      'Water Damage Restoration',
      'Fire Damage Recovery',
      'Mould Remediation',
      'Storm Damage Repair',
      'Emergency Response'
    ]
  }
} as const;

// Helper functions for location data
export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS[slug];
}

export function getAllLocations(): Location[] {
  return Object.values(LOCATIONS);
}

export function getLocationSlugs(): string[] {
  return Object.keys(LOCATIONS);
}

export function getNearbyLocations(locationSlug: string, limit: number = 3): Location[] {
  const location = LOCATIONS[locationSlug];
  if (!location) return [];

  return Object.values(LOCATIONS)
    .filter(l => l.slug !== locationSlug)
    .sort((a, b) => {
      const distA = calculateDistance(
        location.coordinates.lat,
        location.coordinates.lng,
        a.coordinates.lat,
        a.coordinates.lng
      );
      const distB = calculateDistance(
        location.coordinates.lat,
        location.coordinates.lng,
        b.coordinates.lat,
        b.coordinates.lng
      );
      return distA - distB;
    })
    .slice(0, limit);
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
