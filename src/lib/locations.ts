import { Location, ServiceArea, Coordinates } from '@/types/locations';

const locations: Location[] = [
  {
    id: 'brisbane',
    slug: 'brisbane',
    name: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    description: 'Emergency restoration services throughout Brisbane and surrounding areas.',
    coordinates: {
      lat: -27.4698,
      lng: 153.0251
    },
    schema: {
      "@type": "Place",
      name: "Brisbane",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brisbane",
        addressRegion: "QLD",
        postalCode: "4000",
        addressCountry: "AU"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -27.4698,
        longitude: 153.0251
      }
    }
  },
  {
    id: 'gold-coast',
    slug: 'gold-coast',
    name: 'Gold Coast',
    state: 'QLD',
    postcode: '4217',
    description: '24/7 emergency restoration services for the Gold Coast region.',
    coordinates: {
      lat: -28.0167,
      lng: 153.4000
    },
    schema: {
      "@type": "Place",
      name: "Gold Coast",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gold Coast",
        addressRegion: "QLD",
        postalCode: "4217",
        addressCountry: "AU"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -28.0167,
        longitude: 153.4000
      }
    }
  }
];

const serviceAreas: ServiceArea[] = [
  {
    name: 'Brisbane',
    coordinates: { lat: -27.4698, lng: 153.0251 },
    radius: 50
  },
  {
    name: 'Gold Coast',
    coordinates: { lat: -28.0167, lng: 153.4000 },
    radius: 40
  }
];

export function getLocations(): Location[] {
  return locations;
}

export function getLocation(slug: string): Location | undefined {
  return locations.find(location => location.slug === slug);
}

export function getServiceAreas(): ServiceArea[] {
  return serviceAreas;
}

export function isInServiceArea(coordinates: Coordinates): boolean {
  return serviceAreas.some(area => {
    const distance = calculateDistance(coordinates, area.coordinates);
    return distance <= area.radius;
  });
}

// Calculate distance between two points in kilometers
function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  const lat1 = toRad(point1.lat);
  const lat2 = toRad(point2.lat);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function getNearbyLocations(currentLocation: Location, limit = 3): Location[] {
  return locations
    .filter(location => location.id !== currentLocation.id)
    .map(location => ({
      ...location,
      distance: calculateDistance(currentLocation.coordinates, location.coordinates)
    }))
    .sort((a, b) => (a as any).distance - (b as any).distance)
    .slice(0, limit);
}
