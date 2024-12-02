import Link from 'next/link';
import { SERVICES } from '@/config/services';

export interface ServiceFeaturesProps {
  service: string;
  location?: string;
  showLink?: boolean;
}

export function ServiceFeatures({ service, location, showLink = true }: ServiceFeaturesProps) {
  const serviceData = SERVICES[service];
  const features = serviceData?.features || [];
  const serviceName = serviceData?.title || service;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{serviceName}</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {showLink && (
        <div className="pt-4">
          <Link
            href={location ? `/en-AU/services/${service}/${location}` : `/en-AU/services/${service}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <span>Learn More</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
