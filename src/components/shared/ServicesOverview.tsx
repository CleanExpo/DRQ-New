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
  services: Service[];
}

export function ServicesOverview({ 
  title = "Our Services", 
  services 
}: ServicesOverviewProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
