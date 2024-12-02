'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { LoaderOptions } from '@googlemaps/js-api-loader';
import type { Location } from '@/types/locations';

interface GoogleMapProps {
  locations?: Location[];
  centerLocation?: Location;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: string;
  showAllLocations?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

export function GoogleMap({ 
  locations,
  centerLocation,
  latitude,
  longitude,
  zoom = 14,
  height = '400px',
  showAllLocations = false
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError('Google Maps API key is missing');
      setIsLoading(false);
      return;
    }

    const loaderOptions: LoaderOptions = {
      apiKey,
      version: 'weekly',
    };

    const loader = new Loader(loaderOptions);

    loader.load()
      .then((google: typeof window.google) => {
        // Determine center coordinates
        const center = centerLocation 
          ? { lat: centerLocation.coordinates.latitude, lng: centerLocation.coordinates.longitude }
          : latitude && longitude 
            ? { lat: latitude, lng: longitude }
            : { lat: -27.4698, lng: 153.0251 }; // Default to Brisbane

        const mapOptions: google.maps.MapOptions = {
          center,
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
        };

        const map = new google.maps.Map(mapRef.current as HTMLElement, mapOptions);

        // Add markers for locations
        if (locations && locations.length > 0) {
          const bounds = new google.maps.LatLngBounds();

          locations.forEach(location => {
            const position = { 
              lat: location.coordinates.latitude, 
              lng: location.coordinates.longitude 
            };

            const marker = new google.maps.Marker({
              map,
              position,
              title: location.name,
              animation: google.maps.Animation.DROP
            });

            // Add info window with location details
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${location.name}</h3>
                  <p class="text-sm">${location.address.streetAddress}</p>
                  <p class="text-sm">${location.address.suburb}, ${location.address.state} ${location.address.postcode}</p>
                  <a href="/en-AU/locations/${location.slug}" class="text-primary hover:underline text-sm">View Details</a>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            bounds.extend(position);
          });

          // Only fit bounds if showing all locations or if there are multiple locations
          if (showAllLocations || locations.length > 1) {
            map.fitBounds(bounds);
            // Add some padding to the bounds
            const padding = { top: 50, right: 50, bottom: 50, left: 50 };
            map.panToBounds(bounds, padding);
          }
        } else if (centerLocation) {
          // Add single marker for center location
          new google.maps.Marker({
            map,
            position: center,
            title: centerLocation.name,
            animation: google.maps.Animation.DROP
          });
        }

        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.error('Error loading Google Maps:', error);
        setError('Failed to load Google Maps');
        setIsLoading(false);
      });
  }, [latitude, longitude, zoom, locations, centerLocation, showAllLocations]);

  if (error) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height, 
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          textAlign: 'center'
        }}
      >
        <p className="text-gray-600">
          {error}. Please try again later or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: '100%', height }}>
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
          style={{ zIndex: 1 }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="rounded-lg overflow-hidden"
        style={{ 
          width: '100%', 
          height: '100%'
        }}
      />
    </div>
  );
}
