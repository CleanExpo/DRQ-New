'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/services';
import { getLocationBySlug } from '@/lib/locations';

interface SearchResult {
  title: string;
  href: string;
  type: 'service' | 'location';
  description?: string;
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const services = getServices().map(service => ({
      title: service.title,
      href: `/en-AU/services/${service.slug}`,
      type: 'service' as const,
      description: service.description
    }));

    const locations = ['brisbane', 'gold-coast', 'ipswich']
      .map(slug => getLocationBySlug(slug))
      .filter(location => location !== undefined)
      .map(location => ({
        title: location!.name,
        href: `/en-AU/locations/${location!.slug}`,
        type: 'location' as const,
        description: location!.description
      }));

    const filtered = [...services, ...locations].filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <span className="hidden sm:inline text-sm text-gray-400">⌘K</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-screen max-w-xl bg-white rounded-lg shadow-xl z-50">
          <div className="p-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services and locations..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-primary focus:bg-white"
                autoComplete="off"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {results.length > 0 && (
              <div className="mt-4 divide-y divide-gray-100">
                {results.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0 p-1.5 rounded-lg bg-primary/10 text-primary">
                      {result.type === 'service' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
                      {result.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{result.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="py-14 px-6 text-center text-sm sm:px-14">
                <svg
                  className="mx-auto h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 font-semibold text-gray-900">No results found</p>
                <p className="mt-2 text-gray-500">
                  We could not find anything with that term. Try searching for something else.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
