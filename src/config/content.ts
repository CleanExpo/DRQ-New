export const SERVICE_CONTENT = {
  WATER_DAMAGE: {
    title: 'Water Damage Restoration',
    description: 'Professional water damage restoration services with rapid response',
    metaTitle: 'Water Damage Restoration Services Brisbane | DRQ',
    metaDescription: 'Professional water damage restoration services available 24/7. Expert water extraction, structural drying, and property restoration in Brisbane and surrounding areas.',
    features: [
      'Flood Damage Cleanup',
      'Burst Pipe Repairs',
      'Storm Damage',
      'Structural Drying',
      'Moisture Detection',
      'Content Restoration'
    ],
    featureDescriptions: {
      'Flood Damage Cleanup': 'Professional flood water removal and property restoration services',
      'Burst Pipe Repairs': 'Emergency response for burst pipes and water leaks',
      'Storm Damage': 'Comprehensive storm and water damage restoration',
      'Structural Drying': 'Professional grade equipment for thorough structural drying',
      'Moisture Detection': 'Advanced technology to detect hidden moisture and prevent mould',
      'Content Restoration': 'Salvage and restore water-damaged belongings'
    },
    process: [
      'Emergency Response',
      'Assessment',
      'Water Removal',
      'Restoration'
    ],
    processDescriptions: {
      'Emergency Response': '24/7 rapid response to minimize water damage',
      'Assessment': 'Thorough inspection and damage assessment',
      'Water Removal': 'Professional water extraction and drying',
      'Restoration': 'Complete property restoration and repairs'
    },
    faqs: [
      {
        question: 'How quickly can you respond to water damage emergencies?',
        answer: 'We provide 24/7 emergency response with typical arrival times of 1-2 hours in the Brisbane area.'
      },
      {
        question: 'What areas do you service for water damage restoration?',
        answer: 'We service Brisbane, Gold Coast, Ipswich, Logan, and surrounding areas in South East Queensland.'
      },
      {
        question: 'Do you work with insurance companies?',
        answer: 'Yes, we work directly with all major insurance companies and can assist with your claim process.'
      },
      {
        question: 'How long does water damage restoration take?',
        answer: 'The timeline varies depending on damage severity, typically 3-5 days for standard water damage and up to 2 weeks for severe cases.'
      }
    ],
    image: '/images/services/water-damage.jpg',
    schema: {
      service: {
        "@type": "Service",
        "name": "Water Damage Restoration",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Disaster Recovery Queensland"
        },
        "areaServed": "Brisbane and South East Queensland",
        "description": "Professional water damage restoration services available 24/7"
      }
    }
  },
  FIRE_DAMAGE: {
    title: 'Fire Damage Recovery',
    description: 'Expert fire and smoke damage restoration services',
    metaTitle: 'Fire Damage Restoration Services Brisbane | DRQ',
    metaDescription: 'Professional fire damage restoration services available 24/7. Expert smoke damage cleanup, odor removal, and structural restoration in Brisbane and surrounding areas.',
    features: [
      'Fire Damage Assessment',
      'Smoke Damage Cleanup',
      'Odor Removal',
      'Structural Restoration',
      'Content Cleaning',
      'Soot Removal'
    ],
    featureDescriptions: {
      'Fire Damage Assessment': 'Comprehensive evaluation of fire and smoke damage',
      'Smoke Damage Cleanup': 'Professional smoke residue removal services',
      'Odor Removal': 'Advanced techniques for complete odor elimination',
      'Structural Restoration': 'Expert structural repair and reconstruction',
      'Content Cleaning': 'Specialized cleaning for fire-damaged items',
      'Soot Removal': 'Thorough soot cleanup and surface restoration'
    },
    process: [
      'Damage Assessment',
      'Security and Board-up',
      'Cleanup Process',
      'Restoration'
    ],
    processDescriptions: {
      'Damage Assessment': 'Thorough evaluation of fire and smoke damage',
      'Security and Board-up': 'Immediate property security measures',
      'Cleanup Process': 'Professional smoke and soot removal',
      'Restoration': 'Complete property restoration and reconstruction'
    },
    faqs: [
      {
        question: 'How quickly can you respond to fire damage emergencies?',
        answer: 'We provide 24/7 emergency response with typical arrival times of 1-2 hours in the Brisbane area.'
      },
      {
        question: 'Do you handle insurance claims for fire damage?',
        answer: 'Yes, we work directly with all major insurance companies and can assist with your claim process.'
      },
      {
        question: 'How long does fire damage restoration take?',
        answer: 'The timeline varies depending on damage severity, typically 1-2 weeks for moderate damage and up to several weeks for severe cases.'
      }
    ],
    image: '/images/services/fire-damage.jpg',
    schema: {
      service: {
        "@type": "Service",
        "name": "Fire Damage Recovery",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Disaster Recovery Queensland"
        },
        "areaServed": "Brisbane and South East Queensland",
        "description": "Expert fire and smoke damage restoration services"
      }
    }
  },
  MOULD_REMEDIATION: {
    title: 'Mould Remediation',
    description: 'Professional mould removal and prevention services',
    metaTitle: 'Mould Remediation Services Brisbane | DRQ',
    metaDescription: 'Professional mould removal and prevention services available 24/7. Expert inspection, safe removal, and prevention treatment in Brisbane and surrounding areas.',
    features: [
      'Mould Inspection',
      'Air Quality Testing',
      'Containment Setup',
      'Safe Removal',
      'Prevention Treatment',
      'Structural Drying'
    ],
    featureDescriptions: {
      'Mould Inspection': 'Comprehensive mould detection and assessment',
      'Air Quality Testing': 'Professional indoor air quality analysis',
      'Containment Setup': 'Advanced containment to prevent spread',
      'Safe Removal': 'Safe and thorough mould removal process',
      'Prevention Treatment': 'Long-term mould prevention solutions',
      'Structural Drying': 'Complete structural moisture removal'
    },
    process: [
      'Initial Testing',
      'Area Containment',
      'Mould Removal',
      'Prevention'
    ],
    processDescriptions: {
      'Initial Testing': 'Thorough mould and moisture testing',
      'Area Containment': 'Professional containment setup',
      'Mould Removal': 'Safe and effective mould removal',
      'Prevention': 'Long-term prevention measures'
    },
    faqs: [
      {
        question: 'Is mould dangerous to health?',
        answer: 'Yes, mould can cause various health issues including respiratory problems, allergies, and other health concerns. Professional removal is recommended.'
      },
      {
        question: 'How long does mould remediation take?',
        answer: 'The process typically takes 3-7 days depending on the extent of mould growth and the size of the affected area.'
      },
      {
        question: 'Do you provide mould prevention services?',
        answer: 'Yes, we offer comprehensive mould prevention services including moisture control and preventive treatments.'
      }
    ],
    image: '/images/services/mould-remediation.jpg',
    schema: {
      service: {
        "@type": "Service",
        "name": "Mould Remediation",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Disaster Recovery Queensland"
        },
        "areaServed": "Brisbane and South East Queensland",
        "description": "Professional mould removal and prevention services"
      }
    }
  }
} as const;
