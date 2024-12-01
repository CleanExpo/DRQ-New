import { createApi } from 'unsplash-js';

// Initialize the Unsplash API client
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ''
});

// Function to get optimized image URL
export function getImageUrl(path: string): string {
  // If it's an external URL, return as is
  if (path.startsWith('http')) {
    return path;
  }

  // If it's a local image, add the base URL
  return `${process.env.NEXT_PUBLIC_SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Function to get image dimensions
export async function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.src = url;
  });
}

// Function to search Unsplash images
export async function searchImages(query: string, page = 1, perPage = 10) {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation: 'landscape'
    });

    if (result.errors) {
      console.error('Error searching Unsplash:', result.errors[0]);
      return null;
    }

    return result.response;
  } catch (error) {
    console.error('Error searching Unsplash:', error);
    return null;
  }
}

// Function to get a random image
export async function getRandomImage(query: string) {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape'
    });

    if (result.errors) {
      console.error('Error getting random image:', result.errors[0]);
      return null;
    }

    return result.response;
  } catch (error) {
    console.error('Error getting random image:', error);
    return null;
  }
}

// Function to optimize image URL with parameters
export function optimizeImage(url: string, width?: number, quality = 75): string {
  if (!url) return '';
  
  // If it's already an optimized URL, return as is
  if (url.includes('?')) return url;

  // Add optimization parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  params.append('q', quality.toString());
  params.append('auto', 'format');

  return `${url}?${params.toString()}`;
}

// Function to get placeholder blur data URL
export async function getBlurDataUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return '';
  }
}
