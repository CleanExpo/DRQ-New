import { Location, NearbyLocation } from '@/types/locations';

export function getNearbyLocations(location: Location): NearbyLocation[] {
  const locations = [
    {
      name: 'Brisbane',
      slug: 'brisbane',
      distance: 0,
    },
    {
      name: 'Gold Coast',
      slug: 'gold-coast',
      distance: 77.3,
    },
    {
      name: 'Ipswich',
      slug: 'ipswich',
      distance: 40.2,
    }
  ];

  // Filter out the current location and sort by distance
  return locations
    .filter(loc => loc.slug !== location.slug)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3); // Return closest 3 locations
}

export function getLocationBySlug(slug: string): Location | undefined {
  const locations = [
    {
      id: 'brisbane',
      name: 'Brisbane',
      slug: 'brisbane',
      description: 'Professional restoration services in Brisbane and surrounding suburbs',
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
      ]
    },
    {
      id: 'ipswich',
      name: 'Ipswich',
      slug: 'ipswich',
      description: 'Comprehensive restoration services in Ipswich',
      address: {
        streetAddress: '789 Brisbane Rd',
        suburb: 'Ipswich',
        state: 'QLD',
        postcode: '4305'
      },
      coordinates: {
        latitude: -27.6167,
        longitude: 152.7667
      },
      services: [
        'water-damage',
        'flood-damage',
        'mould-remediation',
        'storm-damage',
        'sewage-cleanup'
      ]
    }
  ];

  return locations.find(loc => loc.slug === slug);
}
