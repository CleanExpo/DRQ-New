import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCATIONS, getLocationBySlug, getNearbyLocations } from '@/config/locations';
import { SERVICE_CONTENT } from '@/config/content';
import { GoogleMap } from '@/components/maps/GoogleMap';
import { SchemaProvider } from '@/components/SchemaProvider';
import { getLocationImage } from '@/lib/images';

interface LocationPageProps {
  params: {
    location: string;
  };
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getLocationBySlug(params.location);
  if (!location) return {};

  return {
    title: `Emergency Restoration Services in ${location.name} | DRQ`,
    description: location.metaDescription || 
      `Professional disaster recovery services in ${location.name}. 24/7 emergency response for water damage, fire damage, and mould remediation in ${location.suburbs?.slice(0, 3).join(', ')} and surrounding areas.`,
    openGraph: {
      title: `Disaster Recovery Services in ${location.name}`,
      description: location.metaDescription,
      images: [{ url: '/images/locations/${location.slug}.jpg' }]
    }
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlug(params.location);
  if (!location) notFound();

  const nearbyLocations = getNearbyLocations(params.location, 3);
  const locationImage = await getLocationImage(location.name);
  const services = Object.values(SERVICE_CONTENT);

  return (
    <div className="min-h-screen py-12">
      <SchemaProvider
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Disaster Recovery Queensland - ${location.name}`,
            image: locationImage?.url || '/images/locations/${location.slug}.jpg',
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/en-AU/locations/${location.slug}`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/en-AU/locations/${location.slug}`,
            telephone: "+61-1300-000-000",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "",
              addressLocality: location.name,
              addressRegion: location.state,
              postalCode: location.postcode,
              addressCountry: "AU"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.coordinates.lat,
              longitude: location.coordinates.lng
            },
            areaServed: location.suburbs?.map(suburb => ({
              "@type": "City",
              name: suburb
            }))
          }
        ]}
      />

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          Emergency Restoration Services in {location.name}
        </h1>

        {/* Location Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg mb-6">{location.metaDescription}</p>
            
            {/* Services List */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Our Services in {location.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={`/en-AU/services/${service.title.toLowerCase().replace(/ /g, '-')}/${location.slug}`}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Areas Served */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Areas We Serve in {location.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {location.suburbs?.map((suburb) => (
                  <div key={suburb} className="p-2 bg-gray-50 rounded">
                    {suburb}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map and Contact */}
          <div>
            <div className="h-[400px] mb-6">
              <GoogleMap
                address={`${location.name}, ${location.state} ${location.postcode}`}
                zoom={12}
                height="100%"
              />
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">24/7 Emergency Response</h2>
              <p className="mb-4">
                Our {location.name} team is available 24/7 for emergency restoration services.
                We typically respond within 1-2 hours to minimize damage and begin the recovery process.
              </p>
              <Link
                href="/en-AU/contact"
                className="block w-full text-center bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors"
              >
                Contact Us Now
              </Link>
            </div>
          </div>
        </div>

        {/* Nearby Locations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nearby Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyLocations.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/en-AU/locations/${nearby.slug}`}
                className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold mb-2">{nearby.name}</h3>
                <p className="text-sm text-gray-600">
                  Also serving {nearby.suburbs?.slice(0, 3).join(', ')}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="prose prose-lg max-w-none">
          <h2>Professional Restoration Services in {location.name}</h2>
          <p>
            With a population of {location.population?.toLocaleString()}, {location.name} requires
            reliable and professional emergency restoration services. Our local team is fully equipped
            and certified to handle all types of disaster recovery situations, from water damage
            to fire restoration and mould remediation.
          </p>

          <h3>Why Choose Our {location.name} Services?</h3>
          <ul>
            <li>24/7 emergency response</li>
            <li>Fully equipped local team</li>
            <li>Certified technicians</li>
            <li>Coverage across all {location.name} suburbs</li>
            <li>Direct insurance billing</li>
            <li>Guaranteed satisfaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((location) => ({
    location: location,
  }));
}
