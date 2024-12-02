import { Location, LocationImage } from '@/types/locations';

export function getServiceImage(service: string): string {
  const images: Record<string, string> = {
    'water-damage-restoration': '/images/water-damage-restoration.jpg',
    'flood-damage-cleanup': '/images/flood-damage-cleanup.jpg',
    'mould-remediation': '/images/mould-remediation.jpg',
    'storm-damage-repair': '/images/storm-damage-repair.jpg',
    'sewage-cleanup': '/images/sewage-cleanup.jpg',
  };

  return images[service] || '/images/default-service.jpg';
}

export function getLocationImage(location: Location): LocationImage {
  // If location has a custom image that's already a LocationImage, return it
  if (location.image && typeof location.image !== 'string' && 'url' in location.image) {
    return location.image;
  }

  // Otherwise, generate a LocationImage
  const dimensions = getImageDimensions(typeof location.image === 'string' ? location.image : location.slug);
  return {
    url: typeof location.image === 'string' ? location.image : `/images/locations/${location.slug}.jpg`,
    width: dimensions.width,
    height: dimensions.height,
    alt: `${location.name} - Disaster Recovery QLD`,
    blurDataURL: generateBlurDataURL(location.slug)
  };
}

export function optimizeImage(url: string, width: number = 800): string {
  if (!url) return '';
  
  // If it's already an optimized URL, return as is
  if (url.includes('_next/image')) {
    return url;
  }

  // If it's an external URL, return as is
  if (url.startsWith('http')) {
    return url;
  }

  // Add optimization parameters
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`;
}

export function getImageDimensions(identifier: string): { width: number; height: number } {
  const dimensions: Record<string, { width: number; height: number }> = {
    'water-damage-restoration.jpg': { width: 1920, height: 1080 },
    'flood-damage-cleanup.jpg': { width: 1920, height: 1080 },
    'mould-remediation.jpg': { width: 1920, height: 1080 },
    'storm-damage-repair.jpg': { width: 1920, height: 1080 },
    'sewage-cleanup.jpg': { width: 1920, height: 1080 },
    'default-service.jpg': { width: 1920, height: 1080 },
    'default-location.jpg': { width: 1920, height: 1080 },
    'brisbane': { width: 1920, height: 1080 },
    'gold-coast': { width: 1920, height: 1080 },
    'ipswich': { width: 1920, height: 1080 }
  };

  const key = identifier.split('/').pop() || '';
  return dimensions[key] || { width: 1920, height: 1080 };
}

export function generateBlurDataURL(identifier: string): string {
  // Generate a unique blur data URL based on the identifier
  // In production, this should use a proper blur hash library
  const hash = identifier
    .split('')
    .reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0)
    .toString(36);

  return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYyLk5OUFdQXFxQRktKWExKUk7/2wBDAR${hash}`;
}

export function generateImageMetadata(url: string, alt: string): LocationImage {
  const dimensions = getImageDimensions(url);
  return {
    url,
    width: dimensions.width,
    height: dimensions.height,
    alt,
    blurDataURL: generateBlurDataURL(url)
  };
}
