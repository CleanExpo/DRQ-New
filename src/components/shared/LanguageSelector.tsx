'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@/hooks/useClickOutside';

interface Language {
  code: string;
  name: string;
  flag: string;
  region: string;
}

const languages: Language[] = [
  {
    code: 'en-AU',
    name: 'English',
    flag: '🇦🇺',
    region: 'Australia'
  },
  {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸',
    region: 'United States'
  },
  {
    code: 'zh-CN',
    name: '中文',
    flag: '🇨🇳',
    region: '中国'
  }
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const ref = useClickOutside(() => setIsOpen(false));

  const currentLanguage = languages.find(lang => lang.code === 'en-AU') || languages[0];

  const handleLanguageChange = (language: Language) => {
    // Replace the language code in the current path
    const newPath = window.location.pathname.replace(/^\/[^/]+/, `/${language.code}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <span className="hidden sm:inline text-sm text-gray-500">({currentLanguage.region})</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                language.code === currentLanguage.code ? 'text-primary font-medium' : 'text-gray-600'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <div>
                <span>{language.name}</span>
                <span className="text-sm text-gray-500 ml-1">({language.region})</span>
              </div>
              {language.code === currentLanguage.code && (
                <svg className="w-4 h-4 ml-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
