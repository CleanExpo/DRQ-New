import React from 'react';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  showPhoneNumber?: boolean;
  isDark?: boolean;
}

export function CallToAction({
  title,
  description,
  buttonText,
  buttonHref,
  showPhoneNumber = false,
  isDark = false
}: CallToActionProps) {
  return (
    <section className={`section ${isDark ? 'bg-blue-900 text-white' : 'bg-gray-50'}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-2 mb-6">
            {title}
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-white/90' : 'text-gray-600'}`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={buttonHref}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-colors
                ${isDark 
                  ? 'bg-white text-blue-600 hover:bg-blue-50' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              {buttonText}
            </a>
            {showPhoneNumber && (
              <a
                href="tel:1300309361"
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors
                  ${isDark 
                    ? 'border border-white/20 hover:bg-white/10' 
                    : 'border border-blue-200 hover:bg-blue-50'
                  }
                `}
              >
                <span className="text-xl">📞</span>
                1300 309 361
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
