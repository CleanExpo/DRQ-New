'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface GoogleMapProps {
  address: string;
  zoom?: number;
  height?: string;
}

export function GoogleMap({ address, zoom = 14, height = '400px' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!mapRef.current || !window.google || !scriptLoaded.current) return;

    // Initialize the map
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const map = new google.maps.Map(mapRef.current!, {
          center: results[0].geometry.location,
          zoom,
        });

        // Add a marker
        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
      }
    });
  }, [address, zoom, scriptLoaded.current]);

  const handleScriptLoad = () => {
    scriptLoaded.current = true;
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height,
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}
      />
    </>
  );
}
