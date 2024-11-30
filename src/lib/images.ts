import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

interface ImageDetails {
  url: string;
  blurDataUrl?: string;
  alt: string;
  credit: {
    name: string;
    link: string;
  };
}

const IMAGE_CACHE: { [key: string]: ImageDetails } = {};

export async function getServiceImage(serviceName: string, query?: string): Promise<ImageDetails | null> {
  if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not configured');
    return null;
  }

  // Check cache first
  const cacheKey = `${serviceName}-${query || ''}`;
  if (IMAGE_CACHE[cacheKey]) {
    return IMAGE_CACHE[cacheKey];
  }

  try {
    // Search for relevant image
    const searchQuery = query || `${serviceName} service professional`;
    const result = await unsplash.search.getPhotos({
      query: searchQuery,
      orientation: 'landscape',
      perPage: 1,
    });

    if (result.errors) {
      console.error('Error fetching image from Unsplash:', result.errors[0]);
      return null;
    }

    const photo = result.response?.results[0];
    if (!photo) return null;

    const imageDetails: ImageDetails = {
      url: photo.urls.regular,
      alt: photo.alt_description || `${serviceName} service image`,
      credit: {
        name: photo.user.name,
        link: photo.user.links.html,
      },
    };

    // Cache the result
    IMAGE_CACHE[cacheKey] = imageDetails;

    return imageDetails;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

// Function to get location-specific images
export async function getLocationImage(locationName: string): Promise<ImageDetails | null> {
  return getServiceImage(locationName, `${locationName} city landscape`);
}

// Preload common service images
export async function preloadServiceImages(): Promise<void> {
  const commonServices = [
    'water damage',
    'fire damage',
    'mould remediation',
    'flood cleanup',
    'storm damage',
  ];

  await Promise.all(
    commonServices.map(service => getServiceImage(service))
  );
}

// Get optimized image URL with proper sizing
export function getOptimizedImageUrl(url: string, width: number = 1200): string {
  if (!url) return '';
  
  // If it's already an Unsplash URL, add sizing parameters
  if (url.includes('images.unsplash.com')) {
    return `${url}&w=${width}&q=80&auto=format`;
  }
  
  // For other URLs, return as is
  return url;
}

// Generate blur data URL for images (placeholder)
export function generateBlurDataUrl(width: number = 10, height: number = 6): string {
  return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"></svg>`;
}
