import { Location } from '../types/locations';

const locations: Location[] = [
  {
    id: 'brisbane',
    name: 'Brisbane',
    slug: 'brisbane',
    description: 'Professional restoration services in Brisbane and surrounding areas.',
    image: '/images/locations/brisbane.jpg',
    address: {
      streetAddress: '123 Adelaide Street',
      suburb: 'Brisbane City',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia'
    },
    coordinates: {
      latitude: -27.4698,
      longitude: 153.0251
    },
    services: [
      'water-damage-restoration',
      'flood-damage-cleanup',
      'mould-remediation',
      'storm-damage-repair',
      'sewage-cleanup'
    ],
    nearbyLocations: [
      {
        name: 'Gold Coast',
        url: '/en-AU/locations/gold-coast',
        description: 'Serving the Gold Coast area'
      },
      {
        name: 'Sunshine Coast',
        url: '/en-AU/locations/sunshine-coast',
        description: 'Serving the Sunshine Coast area'
      }
    ]
  },
  {
    id: 'gold-coast',
    name: 'Gold Coast',
    slug: 'gold-coast',
    description: 'Emergency restoration services for the Gold Coast region.',
    image: '/images/locations/gold-coast.jpg',
    address: {
      streetAddress: '45 Cavill Avenue',
      suburb: 'Surfers Paradise',
      state: 'QLD',
      postcode: '4217',
      country: 'Australia'
    },
    coordinates: {
      latitude: -28.0167,
      longitude: 153.4000
    },
    services: [
      'water-damage-restoration',
      'flood-damage-cleanup',
      'mould-remediation',
      'storm-damage-repair'
    ],
    nearbyLocations: [
      {
        name: 'Brisbane',
        url: '/en-AU/locations/brisbane',
        description: 'Serving the Brisbane area'
      }
    ]
  }
];

export function getLocations(): Location[] {
  return locations;
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(location => location.slug === slug);
}

export function getNearbyLocations(location: Location): Location[] {
  return location.nearbyLocations
    ? locations.filter(loc => 
        location.nearbyLocations?.some(nearby => 
          nearby.url.includes(loc.slug)
        )
      )
    : [];
}

export function getLocationsByService(service: string): Location[] {
  return locations.filter(location => 
    location.services.includes(service)
  );
}

export function getLocationCoordinates(location: Location) {
  return {
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude
  };
}
