'use client';

import { useState, useEffect } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Switch } from '@/components/shared/Switch';

interface Preference {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'select';
  options?: { value: string; label: string }[];
  value: string | boolean;
}

const defaultPreferences: Preference[] = [
  {
    id: 'theme',
    label: 'Theme',
    description: 'Choose your preferred theme',
    type: 'select',
    options: [
      { value: 'system', label: 'System Default' },
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' }
    ],
    value: 'system'
  },
  {
    id: 'notifications',
    label: 'Emergency Notifications',
    description: 'Receive alerts about emergency services',
    type: 'toggle',
    value: true
  },
  {
    id: 'location',
    label: 'Location Services',
    description: 'Allow location-based service recommendations',
    type: 'toggle',
    value: false
  }
];

const STORAGE_KEY = 'drq-user-preferences';

export function UserPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preference[]>(defaultPreferences);
  const ref = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handlePreferenceChange = (id: string, newValue: string | boolean) => {
    const updatedPreferences = preferences.map(pref =>
      pref.id === id ? { ...pref, value: newValue } : pref
    );
    setPreferences(updatedPreferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));

    // Apply preferences
    if (id === 'theme') {
      document.documentElement.classList.remove('light', 'dark');
      if (newValue !== 'system') {
        document.documentElement.classList.add(newValue as string);
      }
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Open preferences menu"
        aria-haspopup="dialog"
        aria-controls={isOpen ? "preferences-menu" : undefined}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="hidden sm:inline">Preferences</span>
      </button>

      {isOpen && (
        <div
          id="preferences-menu"
          className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preferences-title"
        >
          <div className="px-4 py-2 border-b">
            <h3 id="preferences-title" className="text-lg font-semibold text-gray-900">User Preferences</h3>
            <p className="text-sm text-gray-500">Customize your experience</p>
          </div>

          <div className="p-4 space-y-6">
            {preferences.map((preference) => (
              <div key={preference.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={preference.id}
                    className="text-sm font-medium text-gray-900"
                  >
                    {preference.label}
                  </label>
                  {preference.type === 'toggle' ? (
                    <Switch
                      id={preference.id}
                      label={preference.label}
                      checked={preference.value as boolean}
                      onChange={(checked) => handlePreferenceChange(preference.id, checked)}
                    />
                  ) : (
                    <select
                      id={preference.id}
                      value={preference.value as string}
                      onChange={(e) => handlePreferenceChange(preference.id, e.target.value)}
                      className="block w-40 rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      aria-label={`Select ${preference.label}`}
                    >
                      {preference.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <p className="text-sm text-gray-500" id={`${preference.id}-description`}>
                  {preference.description}
                </p>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right rounded-b-lg">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 font-medium"
              onClick={() => {
                setPreferences(defaultPreferences);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences));
                setIsOpen(false);
              }}
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
