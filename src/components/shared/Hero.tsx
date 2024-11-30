import React from 'react';

interface HeroButton {
  text: string;
  href: string;
}

interface HeroProps {
  title: string;
  description: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  image?: string;
}

export function Hero({
  title,
  description,
  primaryButton,
  secondaryButton,
  image
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      {image && (
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="heading-1 mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            {primaryButton && (
              <a
                href={primaryButton.href}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {secondaryButton.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
