import fs from 'fs';
import path from 'path';

const pageTemplate = `import type { Metadata } from 'next';
import { LocationPage } from '@/components/templates/LocationPage';
import { LOCATIONS } from '@/config/locations';
import { notFound } from 'next/navigation';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((location) => ({
    location,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { location: string };
  searchParams: SearchParams;
}): Promise<Metadata> {
  const location = LOCATIONS[params.location];
  
  if (!location) {
    return {
      title: 'Location Not Found',
      description: 'The requested location page could not be found.'
    };
  }

  const imageUrl = typeof location.image === 'string' 
    ? location.image 
    : location.image?.url || '/images/default-location.jpg';

  return {
    title: \`\${location.name} | Disaster Recovery QLD\`,
    description: \`Professional restoration services in \${location.name}. Available 24/7 for emergency response.\`,
    openGraph: {
      title: \`\${location.name} | Disaster Recovery QLD\`,
      description: \`Professional restoration services in \${location.name}. Available 24/7 for emergency response.\`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: location.name
        }
      ]
    }
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { location: string };
  searchParams: SearchParams;
}) {
  const location = LOCATIONS[params.location];

  if (!location) {
    notFound();
  }

  return <LocationPage location={location} />;
}`;

const serviceLocationTemplate = `import type { Metadata } from 'next';
import { ServiceLocationPage } from '@/components/templates/ServiceLocationPage';
import { LOCATIONS } from '@/config/locations';
import { SERVICE_CONTENT } from '@/config/content';
import { notFound } from 'next/navigation';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateStaticParams() {
  const services = Object.keys(SERVICE_CONTENT).map(service => 
    service.toLowerCase().replace(/_/g, '-')
  );
  const locations = Object.keys(LOCATIONS);

  const params = [];
  for (const service of services) {
    for (const location of locations) {
      params.push({
        service,
        location,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { service: string; location: string };
  searchParams: SearchParams;
}): Promise<Metadata> {
  const location = LOCATIONS[params.location];
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const service = SERVICE_CONTENT[serviceKey];
  
  if (!location || !service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.'
    };
  }

  return {
    title: \`\${service.title} in \${location.name} | Disaster Recovery QLD\`,
    description: \`Professional \${service.title.toLowerCase()} services in \${location.name}. Available 24/7 for emergency response.\`,
    openGraph: {
      title: \`\${service.title} in \${location.name} | Disaster Recovery QLD\`,
      description: \`Professional \${service.title.toLowerCase()} services in \${location.name}. Available 24/7 for emergency response.\`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: \`\${service.title} in \${location.name}\`
        }
      ]
    }
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { service: string; location: string };
  searchParams: SearchParams;
}) {
  const location = LOCATIONS[params.location];
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const service = SERVICE_CONTENT[serviceKey];

  if (!location || !service) {
    notFound();
  }

  return (
    <ServiceLocationPage
      service={{
        title: service.title,
        description: service.description,
        image: service.image,
        slug: params.service
      }}
      location={location}
    />
  );
}`;

const errorTemplate = `'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}`;

const loadingTemplate = `export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}`;

const notFoundTemplate = `export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p>Could not find requested resource</p>
      </div>
    </div>
  );
}`;

const layoutTemplate = `export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}`;

function createFile(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created ${filePath}`);
}

function generatePages() {
  console.log('🔨 Starting page generation...\n');

  const locations = [
    'brisbane-cbd',
    'inner-brisbane',
    'west-brisbane',
    'south-brisbane',
    'east-brisbane',
    'gold-coast',
    'gold-coast-hinterlands',
    'ipswich',
    'ipswich-country',
    'summerset',
    'lockyer-valley',
    'toowoomba-range',
    'scenic-rim',
    'redland-shire',
    'logan-city',
    'logan-village'
  ];

  const services = [
    'water-damage',
    'mould-remediation',
    'sewage-cleanup',
    'storm-damage',
    'fire-damage',
    'crime-scene-cleaning',
    'structural-drying'
  ];

  // Generate location pages
  locations.forEach(location => {
    const basePath = `src/app/en-AU/locations/${location}`;
    createFile(`${basePath}/page.tsx`, pageTemplate);
    createFile(`${basePath}/layout.tsx`, layoutTemplate);
    createFile(`${basePath}/loading.tsx`, loadingTemplate);
    createFile(`${basePath}/error.tsx`, errorTemplate);
    createFile(`${basePath}/not-found.tsx`, notFoundTemplate);
  });

  // Generate service pages
  services.forEach(service => {
    const basePath = `src/app/en-AU/services/${service}`;
    createFile(`${basePath}/page.tsx`, pageTemplate);
    createFile(`${basePath}/layout.tsx`, layoutTemplate);
    createFile(`${basePath}/loading.tsx`, loadingTemplate);
    createFile(`${basePath}/error.tsx`, errorTemplate);
    createFile(`${basePath}/not-found.tsx`, notFoundTemplate);

    // Generate service location pages
    locations.forEach(location => {
      const serviceLocationPath = `${basePath}/${location}`;
      createFile(`${serviceLocationPath}/page.tsx`, serviceLocationTemplate);
      createFile(`${serviceLocationPath}/layout.tsx`, layoutTemplate);
      createFile(`${serviceLocationPath}/loading.tsx`, loadingTemplate);
      createFile(`${serviceLocationPath}/error.tsx`, errorTemplate);
      createFile(`${serviceLocationPath}/not-found.tsx`, notFoundTemplate);
    });
  });

  console.log('\n✨ Page generation complete!');
}

generatePages();
