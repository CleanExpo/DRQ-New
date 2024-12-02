interface SeoImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
}

interface SeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  siteUrl: string;
  defaultImage: SeoImage;
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
  additionalMetaTags: Array<{
    name: string;
    content: string;
  }>;
  additionalLinkTags: Array<LinkTag>;
}

export const seoConfig: SeoConfig = {
  defaultTitle: "Disaster Recovery QLD | Professional Restoration Services",
  titleTemplate: "%s | Disaster Recovery QLD",
  defaultDescription: "Professional water damage restoration, flood cleanup, and emergency services across Southeast Queensland. Available 24/7 for rapid response.",
  siteUrl: "https://www.disasterrecoveryqld.au",
  defaultImage: {
    url: "/images/default-service.jpg",
    width: 1200,
    height: 630,
    alt: "Disaster Recovery QLD Professional Services"
  },
  twitter: {
    handle: "@disasterrecqld",
    site: "@disasterrecqld",
    cardType: "summary_large_image"
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    },
    {
      name: "theme-color",
      content: "#1e3a8a"
    },
    {
      name: "google-site-verification",
      content: "YOUR_GOOGLE_VERIFICATION_ID"
    },
    {
      name: "msvalidate.01",
      content: "YOUR_BING_VERIFICATION_ID"
    },
    {
      name: "format-detection",
      content: "telephone=no"
    }
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico"
    },
    {
      rel: "manifest",
      href: "/manifest.json"
    },
    {
      rel: "alternate",
      href: "https://www.disasterrecoveryqld.au",
      hrefLang: "en-AU"
    }
  ]
};

export function generateLocationPageMetadata(location: string, service: string) {
  return {
    title: `${service} in ${location} | 24/7 Emergency Response`,
    description: `Professional ${service.toLowerCase()} services in ${location}. Expert technicians, rapid response, and guaranteed satisfaction. Available 24/7 for emergencies.`,
    keywords: [
      service,
      location,
      'emergency response',
      'professional service',
      'disaster recovery',
      'restoration services',
      'Southeast Queensland',
      '24/7 service',
      'rapid response',
      'expert technicians'
    ].join(', '),
    alternates: {
      canonical: `${seoConfig.siteUrl}/en-AU/services/${service.toLowerCase().replace(/\s+/g, '-')}/${location.toLowerCase().replace(/\s+/g, '-')}`
    }
  };
}

export function generateServiceSchema(service: string, location: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service} in ${location}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Disaster Recovery Queensland",
      telephone: "1300309361",
      url: seoConfig.siteUrl,
      areaServed: "Southeast Queensland",
      priceRange: "$$"
    },
    serviceType: service,
    areaServed: {
      "@type": "City",
      name: location,
      "@context": "https://schema.org"
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${seoConfig.siteUrl}/en-AU/services/${service.toLowerCase().replace(/\s+/g, '-')}/${location.toLowerCase().replace(/\s+/g, '-')}`,
      servicePhone: "1300309361",
      availableLanguage: {
        "@type": "Language",
        name: "English"
      }
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Emergency Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "24/7 Emergency Response"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Same Day Service"
          }
        }
      ]
    }
  };
}
