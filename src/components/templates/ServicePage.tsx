import { ReactNode } from 'react';
import Image from 'next/image';

export interface ServicePageProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
}

export function ServicePage({ title, description, image, imageAlt, children }: ServicePageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {children}
      </div>
    </main>
  );
}
