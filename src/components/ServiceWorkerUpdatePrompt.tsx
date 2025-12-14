"use client";

import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';

export default function ServiceWorkerUpdatePrompt() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    let controllerChanged = false;

    const checkForUpdate = async () => {
      if (!('serviceWorker' in navigator)) return;
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return;

      setRegistration(reg);

      // If there's already a waiting worker, show the prompt.
      if (reg.waiting) {
        setUpdateAvailable(true);
      }

      // Listen for new workers.
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateAvailable(true);
          }
        });
      });
    };

    const onControllerChange = () => {
      if (controllerChanged) return;
      controllerChanged = true;
      // New service worker took control; reload to get the latest content.
      window.location.reload();
    };

    void checkForUpdate();
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  const activateUpdate = async () => {
    if (!registration) return;

    // Prefer an already waiting worker
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      return;
    }

    // Otherwise, try to trigger an update flow
    if (registration.update) {
      await registration.update();
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-screen-sm rounded-t-md border bg-card p-3 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium">Update available</p>
          <p className="text-muted-foreground">A new version is ready. Reload to apply the update.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={activateUpdate}>Reload</Button>
          <Button variant="ghost" onClick={() => setUpdateAvailable(false)}>Later</Button>
        </div>
      </div>
    </div>
  );
}