import Link from 'next/link';
import Image from 'next/image';

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

export function ServicesOverview({ 
  title = "Our Services", 
  services = defaultServices
}: ServicesOverviewProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p className="font-semibold">We serve a wide range of clients including:</p>
        <p className="mt-2">
          Residential Clients • Commercial Clients • Management Companies • Real Estates<br />
          Lawyers • Architects • Strata • Insurance Carriers • Self-Insured Clients<br />
          Sporting Facilities • Entertainment Facilities • Restaurants • Bars<br />
          Schools • Government Properties
        </p>
      </div>
    </section>
  );
}
