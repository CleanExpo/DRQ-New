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
    const geocoderRequest: google.maps.GeocoderRequest = {
      address
    };

    geocoder.geocode(geocoderRequest, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const mapOptions: google.maps.MapOptions = {
          center: results[0].geometry.location,
          zoom,
        };

        const map = new google.maps.Map(mapRef.current!, mapOptions);

        // Add a marker
        const markerOptions: google.maps.MarkerOptions = {
          map,
          position: results[0].geometry.location,
        };

        new google.maps.Marker(markerOptions);
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
