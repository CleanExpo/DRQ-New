import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface GoogleMapProps {
  address: string;
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
}

export default function GoogleMap({ 
  address, 
  zoom = 14, 
  height = '400px',
  width = '100%',
  className = ''
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !mapKey) return;

    // Initialize the map
    const initMap = async () => {
      const { Map, Geocoder } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const geocoder = new Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const map = new Map(mapRef.current!, {
            center: results[0].geometry.location,
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          new google.maps.Marker({
            map,
            position: results[0].geometry.location
          });
        }
      });
    };

    initMap();
  }, [address, isLoaded, zoom, mapKey]);

  if (!mapKey) return null;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=maps&callback=Function.prototype`}
        onLoad={() => setIsLoaded(true)}
        strategy="lazyOnload"
      />
      <div 
        ref={mapRef}
        style={{ height, width }}
        className={`rounded-lg shadow-lg ${className}`}
        aria-label={`Map showing location of ${address}`}
      />
    </>
  );
}
