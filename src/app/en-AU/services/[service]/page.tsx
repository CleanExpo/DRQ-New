import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICE_CONTENT } from '@/config/content';
import { generateServiceMetadata } from '@/lib/metadata';
import ServicePage from '@/components/templates/ServicePage';

interface ServicePageProps {
  params: {
    service: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const serviceContent = SERVICE_CONTENT[serviceKey];
  
  if (!serviceContent) return {};
  
  return {
    title: serviceContent.metaTitle,
    description: serviceContent.metaDescription,
  };
}

export default function Service({ params }: ServicePageProps) {
  const serviceKey = params.service.toUpperCase().replace(/-/g, '_') as keyof typeof SERVICE_CONTENT;
  const serviceContent = SERVICE_CONTENT[serviceKey];
  
  if (!serviceContent) {
    notFound();
  }

  return <ServicePage service={serviceContent} slug={params.service} />;
}

// Generate static paths for all services
export async function generateStaticParams() {
  return Object.keys(SERVICE_CONTENT).map((service) => ({
    service: service.toLowerCase().replace(/_/g, '-'),
  }));
}
