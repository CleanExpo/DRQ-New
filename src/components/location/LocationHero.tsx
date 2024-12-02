'use client';

import { GoogleMap } from '@/components/maps/GoogleMap';
import { Location } from '@/types/locations';

interface LocationHeroProps {
  location: Location;
}

export function LocationHero({ location }: LocationHeroProps) {
  return (
    <section className="relative h-[400px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="absolute inset-0">
        <GoogleMap
          center={{
            lat: location.coordinates.latitude,
            lng: location.coordinates.longitude
          }}
          zoom={13}
          markers={[
            {
              position: {
                lat: location.coordinates.latitude,
                lng: location.coordinates.longitude
              },
              title: location.name
            }
          ]}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {location.name} Emergency Restoration Services
          </h1>
          <p className="text-xl text-white/90">
            {location.description}
          </p>
        </div>
      </div>
    </section>
  );
}
