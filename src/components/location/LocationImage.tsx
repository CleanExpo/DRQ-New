'use client';

import Image from 'next/image';
import { LocationImage as LocationImageType } from '@/types/locations';

interface LocationImageProps {
  image: LocationImageType;
}

export function LocationImage({ image }: LocationImageProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
