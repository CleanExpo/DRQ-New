import { getService } from '@/lib/services';
import { notFound } from 'next/navigation';

interface ServicePageParams {
  service: string;
}

export default function ServicePage({ params }: { params: ServicePageParams }) {
  const service = getService(params.service);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-xl text-gray-600">{service.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Services</h2>
          <div className="prose max-w-none">
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-primary/10 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">24/7 Emergency Service</h3>
            <p className="mb-4">Available for urgent restoration needs</p>
            <a
              href="tel:1300309361"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Call 1300 309 361
            </a>
          </div>

          {service.locations && service.locations.length > 0 && (
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Service Areas</h3>
              <ul className="space-y-2">
                {service.locations.map((location) => (
                  <li key={location.id}>
                    <a
                      href={`/en-AU/services/${params.service}/${location.slug}`}
                      className="text-primary hover:underline"
                    >
                      {location.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
