import { ServiceContent } from '@/types/services';
import { Location } from '@/types/locations';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { ServiceFeatures } from '@/components/shared/ServiceFeatures';
import { NearbyLocations } from '@/components/shared/NearbyLocations';

export interface ServicePageProps {
  service: ServiceContent;
  slug: string;
}

export function ServicePage({ service, slug }: ServicePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-xl text-gray-600">{service.description}</p>
      </header>

      {service.image && (
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <ServiceFeatures features={service.features} />

      {service.location && (
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Service Area</h2>
          <div className="h-96 mb-4">
            <GoogleMap
              center={{
                latitude: service.location.coordinates.latitude,
                longitude: service.location.coordinates.longitude
              }}
              zoom={12}
              markers={[
                {
                  id: service.location.id,
                  name: service.location.name,
                  coordinates: {
                    latitude: service.location.coordinates.latitude,
                    longitude: service.location.coordinates.longitude
                  }
                }
              ]}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{service.location.name}</h3>
            <address className="text-gray-600 not-italic">
              {service.location.address.streetAddress}<br />
              {service.location.address.suburb}, {service.location.address.state} {service.location.address.postcode}
            </address>
          </div>
        </section>
      )}

      {service.nearbyLocations && service.nearbyLocations.length > 0 && (
        <NearbyLocations
          locations={service.nearbyLocations}
          service={slug}
        />
      )}

      {service.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(service.schema)
          }}
        />
      )}
    </div>
  );
}
