"use client";

import { useEffect } from 'react';

export default function PWAProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register the service worker; ignores the promise intentionally.
      void navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return null;
}