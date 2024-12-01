'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: string;
  className?: string;
}

declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

export function GoogleMap({ center, zoom = 12, height = '400px', className = '' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    const initMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
          }
        ]
      });

      setMapInstance(map);

      // Add marker at center
      new google.maps.Marker({
        position: center,
        map
      });
    };

    // Initialize map when Google Maps API is loaded
    if (window.google?.maps) {
      initMap();
    } else {
      // Google Maps API will call this global function when loaded
      window.initMap = initMap;
    }
  }, [center, zoom, mapInstance]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
        strategy="lazyOnload"
      />
      <div 
        ref={mapRef}
        className={`w-full shadow-md rounded-lg ${className}`}
        style={{ height }}
      />
    </>
  );
}
