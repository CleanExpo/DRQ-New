'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
}

export function GoogleMap({ latitude, longitude, zoom = 14, height = '400px' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!mapRef.current || !window.google || !scriptLoaded.current) return;

    const location = { lat: latitude, lng: longitude };
    const mapOptions: google.maps.MapOptions = {
      center: location,
      zoom,
    };

    const map = new google.maps.Map(mapRef.current, mapOptions);

    new google.maps.Marker({
      map,
      position: location,
    });
  }, [latitude, longitude, zoom, scriptLoaded.current]);

  const handleScriptLoad = () => {
    scriptLoaded.current = true;
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
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
