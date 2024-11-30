import { Metadata } from 'next';
import Link from 'next/link';
import { LOCATIONS, getAllLocations } from '@/config/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { SERVICE_CONTENT } from '@/config/content';

export const metadata: Metadata = {
  title: 'Service Areas | Disaster Recovery Queensland',
  description: 'Professional disaster recovery services across South East Queensland including Brisbane, Gold Coast, Sunshine Coast, Ipswich, and Logan. 24/7 emergency response available.',
  openGraph: {
    title: 'Service Areas | DRQ',
    description: 'Professional disaster recovery services across South East Queensland',
    images: [{ url: '/images/service-areas.jpg' }]
  }
};

export default function LocationsPage() {
  const locations = getAllLocations();
  const services = Object.values(SERVICE_CONTENT);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Our Service Areas</h1>
        
        {/* Service Areas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {locations.map((location) => (
            <div key={location.slug} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
              <p className="text-gray-600 mb-4">{location.metaDescription}</p>
              
              {/* Service List */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Available Services:</h3>
                <ul className="space-y-2">
                  {location.servicesOffered?.map((service) => (
                    <li key={service}>
                      <Link 
                        href={`/en-AU/services/${service.toLowerCase().replace(/ /g, '-')}/${location.slug}`}
                        className="text-primary-600 hover:underline"
                      >
                        {service} in {location.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suburbs Served */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Areas Served:</h3>
                <p className="text-sm text-gray-600">
                  {location.suburbs?.join(', ')}
                </p>
              </div>

              {/* Map */}
              <div className="h-48 mb-4">
                <GoogleMap
                  address={`${location.name}, ${location.state} ${location.postcode}`}
                  zoom={12}
                  height="100%"
                />
              </div>

              {/* Contact Button */}
              <Link
                href={`/en-AU/contact?location=${location.slug}`}
                className="block w-full text-center bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
              >
                Contact {location.name} Office
              </Link>
            </div>
          ))}
        </div>

        {/* Service Coverage Map */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Coverage Area</h2>
          <div className="h-[600px] rounded-lg overflow-hidden">
            <GoogleMap
              address="Brisbane, QLD"
              zoom={9}
              height="100%"
              className="w-full"
            />
          </div>
        </div>

        {/* SEO Content */}
        <div className="prose prose-lg max-w-none">
          <h2>24/7 Emergency Services Across South East Queensland</h2>
          <p>
            Disaster Recovery Queensland provides professional restoration services across all major
            regions of South East Queensland. With strategically located offices and rapid response
            teams, we ensure quick emergency response times to minimize damage and begin the
            restoration process as soon as possible.
          </p>

          <h3>Our Service Coverage</h3>
          <p>
            We maintain fully equipped offices and response teams in {locations.map(l => l.name).join(', ')}.
            Each location is staffed with certified technicians and equipped with the latest restoration
            technology to handle any disaster recovery situation.
          </p>

          <h3>Available Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.title}>
                {service.title} - {service.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
