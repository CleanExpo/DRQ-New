import { Location, LocationImage } from '../types/locations';

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
  // If location has a custom image, use it
  if (location.image) {
    const dimensions = getImageDimensions(location.image);
    return {
      url: location.image,
      width: dimensions.width,
      height: dimensions.height,
      alt: location.name,
      blurDataURL: generateBlurDataURL(location.image)
    };
  }

  // Otherwise, use a default image based on the service type
  const defaultImages: Record<string, string> = {
    'water-damage': '/images/water-damage-restoration.jpg',
    'flood': '/images/flood-damage-cleanup.jpg',
    'mould': '/images/mould-remediation.jpg',
    'storm': '/images/storm-damage-repair.jpg',
    'sewage': '/images/sewage-cleanup.jpg',
  };

  // Try to match location name with service type
  const serviceType = Object.keys(defaultImages).find(type => 
    location.name.toLowerCase().includes(type)
  );

  const defaultImage = serviceType ? defaultImages[serviceType] : '/images/default-location.jpg';
  const dimensions = getImageDimensions(defaultImage);

  return {
    url: defaultImage,
    width: dimensions.width,
    height: dimensions.height,
    alt: location.name,
    blurDataURL: generateBlurDataURL(defaultImage)
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

export function getImageDimensions(url: string): { width: number; height: number } {
  const dimensions: Record<string, { width: number; height: number }> = {
    'water-damage-restoration.jpg': { width: 1920, height: 1080 },
    'flood-damage-cleanup.jpg': { width: 1920, height: 1080 },
    'mould-remediation.jpg': { width: 1920, height: 1080 },
    'storm-damage-repair.jpg': { width: 1920, height: 1080 },
    'sewage-cleanup.jpg': { width: 1920, height: 1080 },
    'default-service.jpg': { width: 1920, height: 1080 },
    'default-location.jpg': { width: 1920, height: 1080 },
  };

  const filename = url.split('/').pop();
  return filename && dimensions[filename] ? dimensions[filename] : { width: 1920, height: 1080 };
}

export function generateBlurDataURL(url: string): string {
  // For now, return a simple blur data URL
  // In production, this should generate a proper blur hash
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYyLk5OUFdQXFxQRktKWExKUk7/2wBDAR';
}

export function generateImageMetadata(url: string, alt: string): LocationImage {
  const dimensions = getImageDimensions(url);
  return {
    url,
    width: dimensions.width,
    height: dimensions.height,
    alt,
    blurDataURL: generateBlurDataURL(url),
  };
}
