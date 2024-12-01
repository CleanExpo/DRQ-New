import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  address: string;
  zoom?: number;
  height?: string;
}

export function GoogleMap({ address, zoom = 14, height = '400px' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!mapRef.current) return;

      // Initialize the map
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const map = new google.maps.Map(mapRef.current, {
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
    };

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, [address, zoom]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height,
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}
    />
  );
}
