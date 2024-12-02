import { ServiceData } from '@/types/services';

export const SERVICES: { [key: string]: ServiceData } = {
  'flood-damage': {
    id: 'flood-damage',
    slug: 'flood-damage',
    title: 'Flood Damage Restoration',
    description: 'Professional flood damage restoration services. Available 24/7 for emergencies.',
    features: [
      '24/7 Emergency Response',
      'Professional Water Extraction',
      'Structural Drying',
      'Mould Prevention',
      'Content Restoration',
      'Insurance Claim Assistance'
    ],
    image: '/images/flood-damage-cleanup.jpg',
    locations: [
      {
        id: 'brisbane',
        name: 'Brisbane',
        slug: 'brisbane'
      },
      {
        id: 'ipswich',
        name: 'Ipswich',
        slug: 'ipswich'
      }
    ]
  },
  'water-damage': {
    id: 'water-damage',
    slug: 'water-damage',
    title: 'Water Damage Restoration',
    description: 'Expert water damage restoration services. Fast response and professional results.',
    features: [
      'Rapid Water Extraction',
      'Advanced Drying Equipment',
      'Moisture Detection',
      'Dehumidification',
      'Odour Control',
      'Full Restoration Service'
    ],
    image: '/images/water-damage-restoration.jpg',
    locations: [
      {
        id: 'brisbane',
        name: 'Brisbane',
        slug: 'brisbane'
      },
      {
        id: 'ipswich',
        name: 'Ipswich',
        slug: 'ipswich'
      }
    ]
  }
};
