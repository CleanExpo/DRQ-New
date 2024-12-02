import { Location } from '../types/locations';

export const LOCATIONS: { [key: string]: Location } = {
  'brisbane-cbd': {
    id: 'brisbane-cbd',
    name: 'Brisbane CBD',
    slug: 'brisbane-cbd',
    description: 'Professional disaster recovery services in Brisbane CBD. 24/7 emergency response.',
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
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Brisbane CBD', 'City Center']
  },
  'inner-brisbane': {
    id: 'inner-brisbane',
    name: 'Inner Brisbane',
    slug: 'inner-brisbane',
    description: 'Expert disaster recovery services in Inner Brisbane suburbs. Available 24/7.',
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
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Fortitude Valley', 'New Farm', 'Teneriffe', 'Spring Hill', 'Paddington']
  },
  'west-brisbane': {
    id: 'west-brisbane',
    name: 'West Brisbane',
    slug: 'west-brisbane',
    description: 'Professional disaster recovery services in Western Brisbane suburbs. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.5598,
      longitude: 152.9169
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Indooroopilly', 'Toowong', 'St Lucia', 'Chapel Hill', 'Kenmore']
  },
  'south-brisbane': {
    id: 'south-brisbane',
    name: 'South Brisbane',
    slug: 'south-brisbane',
    description: 'Expert disaster recovery services in South Brisbane suburbs. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.4809,
      longitude: 153.0172
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['South Brisbane', 'West End', 'Woolloongabba', 'Kangaroo Point']
  },
  'east-brisbane': {
    id: 'east-brisbane',
    name: 'East Brisbane',
    slug: 'east-brisbane',
    description: 'Professional disaster recovery services in Eastern Brisbane suburbs. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.4809,
      longitude: 153.0572
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['East Brisbane', 'Norman Park', 'Bulimba', 'Hawthorne', 'Morningside']
  },
  'gold-coast': {
    id: 'gold-coast',
    name: 'Gold Coast',
    slug: 'gold-coast',
    description: 'Expert disaster recovery services on the Gold Coast. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -28.0167,
      longitude: 153.4000
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Surfers Paradise', 'Broadbeach', 'Main Beach', 'Southport', 'Robina']
  },
  'gold-coast-hinterlands': {
    id: 'gold-coast-hinterlands',
    name: 'Gold Coast Hinterlands',
    slug: 'gold-coast-hinterlands',
    description: 'Professional disaster recovery services in Gold Coast Hinterlands. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -28.1167,
      longitude: 153.2000
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Mount Tamborine', 'Canungra', 'Mudgeeraba', 'Springbrook']
  },
  'ipswich': {
    id: 'ipswich',
    name: 'Ipswich',
    slug: 'ipswich',
    description: 'Expert disaster recovery services in Ipswich. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.6167,
      longitude: 152.7667
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Ipswich CBD', 'North Ipswich', 'East Ipswich', 'West Ipswich']
  },
  'ipswich-country': {
    id: 'ipswich-country',
    name: 'Ipswich Country Areas',
    slug: 'ipswich-country',
    description: 'Professional disaster recovery services in Ipswich country areas. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.6167,
      longitude: 152.7667
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Rosewood', 'Marburg', 'Walloon', 'Toogoolawah']
  },
  'summerset': {
    id: 'summerset',
    name: 'Somerset Region',
    slug: 'summerset',
    description: 'Expert disaster recovery services in Somerset Region. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.0667,
      longitude: 152.3833
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Esk', 'Kilcoy', 'Lowood', 'Fernvale']
  },
  'lockyer-valley': {
    id: 'lockyer-valley',
    name: 'Lockyer Valley',
    slug: 'lockyer-valley',
    description: 'Professional disaster recovery services in Lockyer Valley. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.5667,
      longitude: 152.2667
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Gatton', 'Laidley', 'Forest Hill', 'Plainland']
  },
  'toowoomba-range': {
    id: 'toowoomba-range',
    name: 'Toowoomba Range',
    slug: 'toowoomba-range',
    description: 'Expert disaster recovery services in Toowoomba Range. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.5598,
      longitude: 151.9507
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Toowoomba', 'Withcott', 'Blue Mountain Heights']
  },
  'scenic-rim': {
    id: 'scenic-rim',
    name: 'Scenic Rim',
    slug: 'scenic-rim',
    description: 'Professional disaster recovery services in Scenic Rim. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -28.0333,
      longitude: 152.9000
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Beaudesert', 'Boonah', 'Rathdowney', 'Kooralbyn']
  },
  'redland-shire': {
    id: 'redland-shire',
    name: 'Redland Shire',
    slug: 'redland-shire',
    description: 'Expert disaster recovery services in Redland Shire. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.5254,
      longitude: 153.2547
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Cleveland', 'Capalaba', 'Victoria Point', 'Wellington Point']
  },
  'logan-city': {
    id: 'logan-city',
    name: 'Logan City',
    slug: 'logan-city',
    description: 'Professional disaster recovery services in Logan City. 24/7 emergency response.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.6389,
      longitude: 153.1073
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Logan Central', 'Springwood', 'Woodridge', 'Shailer Park']
  },
  'logan-village': {
    id: 'logan-village',
    name: 'Logan Village',
    slug: 'logan-village',
    description: 'Expert disaster recovery services in Logan Village. Available 24/7.',
    address: {
      streetAddress: '17 Tile St',
      suburb: 'Wacol',
      state: 'QLD',
      postcode: '4076'
    },
    coordinates: {
      latitude: -27.7667,
      longitude: 153.1000
    },
    services: [
      'water-damage',
      'mould-remediation',
      'sewage-cleanup',
      'storm-damage',
      'fire-damage',
      'crime-scene-cleaning',
      'structural-drying'
    ],
    serviceArea: ['Logan Village', 'Yarrabilba', 'Cedar Grove', 'Cedar Vale']
  }
};
