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
  locations: {
    brisbane: {
      name: 'Brisbane',
      state: 'QLD',
      coordinates: {
        lat: -27.4698,
        lng: 153.0251
      }
    },
    goldCoast: {
      name: 'Gold Coast',
      state: 'QLD',
      coordinates: {
        lat: -28.0167,
        lng: 153.4000
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
