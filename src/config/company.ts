export const companyConfig = {
  name: 'Disaster Recovery Queensland',
  website: 'www.disasterrecoveryqld.au',
  phone: '1300 309 361',
  email: 'admin@disasterrecoveryqld.au',
  hours: {
    weekday: 'Monday to Friday 8am to 4pm',
    weekend: 'Saturday - Sunday (On Call)',
    emergency: '24/7 365 Emergency Services'
  },
  social: {
    facebook: 'https://www.facebook.com/disasterrecoveryqld',
    instagram: 'https://www.instagram.com/disasterrecoveryqld'
  },
  mainOffice: {
    name: 'Head Office',
    address: '17 Tile St',
    suburb: 'Wacol',
    state: 'QLD',
    postcode: '4076'
  },
  locations: {
    brisbane: {
      name: 'Brisbane CBD',
      state: 'QLD',
      coordinates: {
        lat: -27.4698,
        lng: 153.0251
      }
    },
    logan: {
      name: 'Logan City',
      state: 'QLD',
      coordinates: {
        lat: -27.6389,
        lng: 153.1073
      }
    },
    goldCoast: {
      name: 'Gold Coast',
      state: 'QLD',
      coordinates: {
        lat: -28.0167,
        lng: 153.4000
      }
    },
    redlands: {
      name: 'Redland Shire',
      state: 'QLD',
      coordinates: {
        lat: -27.5254,
        lng: 153.2547
      }
    },
    ipswich: {
      name: 'Ipswich',
      state: 'QLD',
      coordinates: {
        lat: -27.6167,
        lng: 152.7667
      }
    }
  }
} as const;

// Helper functions to ensure type safety when accessing config
export function getCompanyPhone(): string {
  return companyConfig.phone;
}

export function getCompanyEmail(): string {
  return companyConfig.email;
}

export function getCompanyHours(): typeof companyConfig.hours {
  return companyConfig.hours;
}

export function getCompanyWebsite(): string {
  return companyConfig.website;
}

export function getCompanyName(): string {
  return companyConfig.name;
}

export function getCompanySocial(): typeof companyConfig.social {
  return companyConfig.social;
}

export function getCompanyLocations(): typeof companyConfig.locations {
  return companyConfig.locations;
}

export function getMainOffice(): typeof companyConfig.mainOffice {
  return companyConfig.mainOffice;
}

// Format for display
export function formatBusinessHours(): string {
  const { weekday, weekend, emergency } = companyConfig.hours;
  return `${weekday}\n${weekend}\n${emergency}`;
}

// Schema.org structured data
export function getCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: companyConfig.name,
    telephone: companyConfig.phone,
    email: companyConfig.email,
    url: `https://${companyConfig.website}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyConfig.mainOffice.address,
      addressLocality: companyConfig.mainOffice.suburb,
      addressRegion: companyConfig.mainOffice.state,
      postalCode: companyConfig.mainOffice.postcode,
      addressCountry: "AU"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        description: "On Call"
      }
    ],
    specialOpeningHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "24/7 365 Emergency Services"
    }
  };
}
