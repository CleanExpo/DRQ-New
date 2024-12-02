import Link from 'next/link';
import Image from 'next/image';
import { IconWater, IconFire, IconMold, IconStorm, IconSewage, IconCrime } from './icons';

interface Service {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface ServicesOverviewProps {
  title?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "Water Damage Restoration",
    description: "Professional water damage restoration and structural drying services",
    image: "/images/water-damage-restoration.jpg",
    href: "/en-AU/services/water-damage"
  },
  {
    title: "Mould Remediation",
    description: "Expert mould removal and prevention services",
    image: "/images/mould-remediation.jpg",
    href: "/en-AU/services/mould-remediation"
  },
  {
    title: "Sewage Cleanup",
    description: "Professional sewage cleanup and sanitization services",
    image: "/images/sewage-cleanup.jpg",
    href: "/en-AU/services/sewage-cleanup"
  },
  {
    title: "Storm Damage Restoration",
    description: "Comprehensive storm damage restoration services",
    image: "/images/storm-damage.jpg",
    href: "/en-AU/services/storm-damage"
  },
  {
    title: "Fire Damage Restoration",
    description: "Expert fire and smoke damage restoration services",
    image: "/images/fire-damage.jpg",
    href: "/en-AU/services/fire-damage"
  },
  {
    title: "Crime Scene Cleaning",
    description: "Professional and discreet crime scene cleaning services",
    image: "/images/crime-scene-cleaning.jpg",
    href: "/en-AU/services/crime-scene-cleaning"
  }
];

const getServiceIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case 'water damage restoration':
      return <IconWater className="w-12 h-12 text-primary" />;
    case 'fire damage restoration':
      return <IconFire className="w-12 h-12 text-primary" />;
    case 'mould remediation':
      return <IconMold className="w-12 h-12 text-primary" />;
    case 'storm damage restoration':
      return <IconStorm className="w-12 h-12 text-primary" />;
    case 'sewage cleanup':
      return <IconSewage className="w-12 h-12 text-primary" />;
    case 'crime scene cleaning':
      return <IconCrime className="w-12 h-12 text-primary" />;
    default:
      return null;
  }
};

export function ServicesOverview({ 
  title = "Our Services", 
  services = defaultServices 
}: ServicesOverviewProps) {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3">
                  {getServiceIcon(service.title)}
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-4 flex items-center text-primary font-semibold">
                Learn More
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-600 mb-6">
          Professional restoration services for residential and commercial properties
        </p>
        <a
          href="tel:1300309361"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
        >
          Call Now: 1300 309 361
        </a>
      </div>
    </section>
  );
}
