const fs = require('fs');
const path = require('path');

const services = [
  {
    slug: 'water-damage',
    title: 'Water Damage Restoration',
    description: 'Professional water damage restoration services for homes and businesses',
    image: '/images/water-damage-restoration.jpg'
  },
  {
    slug: 'flood-damage',
    title: 'Flood Damage Cleanup',
    description: 'Expert flood damage cleanup and restoration services',
    image: '/images/flood-damage-cleanup.jpg'
  },
  {
    slug: 'mould-remediation',
    title: 'Mould Remediation',
    description: 'Professional mould removal and remediation services',
    image: '/images/mould-remediation.jpg'
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage Repair',
    description: 'Emergency storm damage repair and restoration',
    image: '/images/storm-damage-repair.jpg'
  },
  {
    slug: 'sewage-cleanup',
    title: 'Sewage Cleanup',
    description: 'Professional sewage cleanup and sanitization services',
    image: '/images/sewage-cleanup.jpg'
  }
];

const locations = [
  {
    slug: 'brisbane',
    name: 'Brisbane',
    description: 'Emergency restoration services in Brisbane and surrounding areas',
    coordinates: { latitude: -27.4698, longitude: 153.0251 }
  },
  {
    slug: 'gold-coast',
    name: 'Gold Coast',
    description: 'Professional restoration services for the Gold Coast region',
    coordinates: { latitude: -28.0167, longitude: 153.4000 }
  },
  {
    slug: 'ipswich',
    name: 'Ipswich',
    description: 'Comprehensive restoration services in Ipswich',
    coordinates: { latitude: -27.6167, longitude: 152.7667 }
  }
];

function generateLocationPage(location) {
  const template = `import { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { getLocationImage } from '@/lib/images';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '${location.name} Emergency Restoration Services | Disaster Recovery QLD',
  description: '${location.description}',
};

export default function Page() {
  const location = getLocationBySlug('${location.slug}');
  
  if (!location) {
    notFound();
  }

  const image = getLocationImage(location);

  return (
    <LocationPage
      location={location}
      image={image}
    />
  );
}`;

  const dir = path.join(process.cwd(), 'src', 'app', 'en-AU', 'locations', location.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.tsx'), template);
}

function generateServicePage(service) {
  const template = `import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';

export const metadata: Metadata = {
  title: '${service.title} | Disaster Recovery QLD',
  description: '${service.description}',
};

export default function Page() {
  return (
    <ServicePage
      title="${service.title}"
      description="${service.description}"
      image="${service.image}"
      slug="${service.slug}"
    />
  );
}`;

  const dir = path.join(process.cwd(), 'src', 'app', 'en-AU', 'services', service.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.tsx'), template);
}

function generateServiceLocationPages() {
  services.forEach(service => {
    locations.forEach(location => {
      const template = `import { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { getLocationBySlug } from '@/lib/locations';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '${service.title} in ${location.name} | Disaster Recovery QLD',
  description: '${service.description} in ${location.name} and surrounding areas',
};

export default function Page() {
  const location = getLocationBySlug('${location.slug}');
  
  if (!location) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: "${service.title}",
        description: "${service.description}",
        image: "${service.image}",
        slug: "${service.slug}"
      }}
      location={location}
    />
  );
}`;

      const dir = path.join(process.cwd(), 'src', 'app', 'en-AU', 'services', service.slug, location.slug);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(path.join(dir, 'page.tsx'), template);
    });
  });
}

// Generate all pages
console.log('Generating service pages...');
services.forEach(generateServicePage);

console.log('Generating location pages...');
locations.forEach(generateLocationPage);

console.log('Generating service-location pages...');
generateServiceLocationPages();

console.log('Page generation complete!');
