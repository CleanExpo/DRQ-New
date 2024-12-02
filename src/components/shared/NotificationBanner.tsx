'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  link?: {
    text: string;
    url: string;
  };
  dismissible?: boolean;
  expiresAt?: Date;
}

const STORAGE_KEY = 'drq-notifications-dismissed';

function getIcon(type: Notification['type']) {
  switch (type) {
    case 'info':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'warning':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'success':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'error':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

function getBgColor(type: Notification['type']) {
  switch (type) {
    case 'info':
      return 'bg-blue-50';
    case 'warning':
      return 'bg-yellow-50';
    case 'success':
      return 'bg-green-50';
    case 'error':
      return 'bg-red-50';
  }
}

function getTextColor(type: Notification['type']) {
  switch (type) {
    case 'info':
      return 'text-blue-800';
    case 'warning':
      return 'text-yellow-800';
    case 'success':
      return 'text-green-800';
    case 'error':
      return 'text-red-800';
  }
}

export function NotificationBanner() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    // Load dismissed notifications from localStorage
    const dismissed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setDismissedIds(dismissed);

    // Example notification - in production, this would come from an API
    const exampleNotification: Notification = {
      id: 'emergency-response',
      type: 'info',
      message: 'Our emergency response team is available 24/7 during the holiday season.',
      link: {
        text: 'Contact Us',
        url: '/en-AU/contact'
      },
      dismissible: true,
      expiresAt: new Date('2024-01-15')
    };

    setNotifications([exampleNotification]);
  }, []);

  const handleDismiss = (id: string) => {
    const newDismissedIds = [...dismissedIds, id];
    setDismissedIds(newDismissedIds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDismissedIds));
  };

  const activeNotifications = notifications.filter(notification => {
    const notDismissed = !dismissedIds.includes(notification.id);
    const notExpired = !notification.expiresAt || new Date(notification.expiresAt) > new Date();
    return notDismissed && notExpired;
  });

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} ${getTextColor(notification.type)}`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {getIcon(notification.type)}
                <p className="text-sm font-medium">
                  {notification.message}
                  {notification.link && (
                    <a
                      href={notification.link.url}
                      className="ml-2 font-semibold underline hover:opacity-80"
                    >
                      {notification.link.text}
                    </a>
                  )}
                </p>
              </div>
              {notification.dismissible && (
                <button
                  type="button"
                  className="flex-shrink-0 hover:opacity-80"
                  onClick={() => handleDismiss(notification.id)}
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
