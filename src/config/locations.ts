import { Location } from '@/types/locations';

export const LOCATIONS: { [key: string]: Location } = {
  'brisbane': {
    id: 'brisbane',
    name: 'Brisbane',
    slug: 'brisbane',
    description: 'Professional disaster recovery services in Brisbane. 24/7 emergency response.',
    address: {
      streetAddress: '123 Adelaide Street',
      suburb: 'Brisbane City',
      state: 'QLD',
      postcode: '4000'
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
      'Brisbane CBD',
      'South Brisbane',
      'West End',
      'Fortitude Valley',
      'New Farm',
      'Paddington',
      'Red Hill',
      'Spring Hill',
      'Kangaroo Point'
    ]
  },
  'ipswich': {
    id: 'ipswich',
    name: 'Ipswich',
    slug: 'ipswich',
    description: 'Expert disaster recovery and restoration services in Ipswich. Available 24/7.',
    address: {
      streetAddress: '123 Brisbane Street',
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
    ],
    serviceArea: [
      'Ipswich CBD',
      'North Ipswich',
      'East Ipswich',
      'West Ipswich',
      'South Ipswich'
    ]
  }
};
