'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useClickOutside } from '@/hooks/useClickOutside';

interface MegaMenuProps {
  title: string;
  items: Array<{
    name: string;
    href: string;
    description?: string;
    icon?: string;
  }>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function MegaMenu({ title, items, isOpen, onToggle, onClose }: MegaMenuProps) {
  const ref = useClickOutside(onClose);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div ref={ref} className="relative group">
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="flex items-center space-x-1 text-gray-600 hover:text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-screen max-w-7xl bg-white rounded-lg shadow-xl mt-2 p-6 grid grid-cols-2 gap-8 z-50">
          <div className="col-span-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">Explore our professional restoration services</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                {item.icon && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-base font-medium text-gray-900 mb-4">Emergency Services</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Available 24/7 for urgent restoration needs across Southeast Queensland
              </p>
              <a
                href="tel:1300309361"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">1300 309 361</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
