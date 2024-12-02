'use client';

import { useEffect, useRef } from 'react';

interface LatLng {
  lat: number;
  lng: number;
}

interface Marker {
  position: LatLng;
  title: string;
}

export interface GoogleMapProps {
  center: LatLng;
  zoom: number;
  markers?: Marker[];
}

export function GoogleMap({ center, zoom, markers = [] }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Check if map ref and Google Maps API are available
    if (!mapRef.current || !window.google) return;

    const initMap = async () => {
      try {
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        
        if (!mapRef.current) return;

        mapInstanceRef.current = new Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Add markers
        markers.forEach(marker => {
          new google.maps.Marker({
            position: marker.position,
            map: mapInstanceRef.current,
            title: marker.title,
            animation: google.maps.Animation.DROP
          });
        });
      } catch (error) {
        console.error('Error initializing Google Map:', error);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    };
  }, [center, zoom, markers]);

  return (
    <div ref={mapRef} className="w-full h-full" />
  );
}
