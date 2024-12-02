'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DropdownProps {
  title: string;
  items: Array<{ name: string; href: string }>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function Dropdown({ title, items, isOpen, onToggle, onClose }: DropdownProps) {
  const ref = useClickOutside(onClose);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          const firstLink = contentRef.current?.querySelector('a');
          if (firstLink instanceof HTMLElement) {
            firstLink.focus();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
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
      
      <div
        ref={contentRef}
        className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="py-1" role="none">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors focus:outline-none focus:bg-primary/10 focus:text-primary"
              onClick={onClose}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  const nextLink = e.currentTarget.nextElementSibling;
                  if (nextLink instanceof HTMLElement) {
                    nextLink.focus();
                  }
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  const prevLink = e.currentTarget.previousElementSibling;
                  if (prevLink instanceof HTMLElement) {
                    prevLink.focus();
                  } else {
                    buttonRef.current?.focus();
                  }
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
