"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  // Detect iOS and standalone state for install guidance
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      // iOS Safari legacy
      (window.navigator as unknown as { standalone?: boolean }).standalone === true);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const bip = e as BeforeInstallPromptEvent;
      setDeferredPrompt(bip);
      setVisible(true);
    };

    const onAppInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    // If iOS and not already installed, show guidance banner
    if (isIOS && !isStandalone) {
      setVisible(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, [isIOS, isStandalone]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setVisible(false);
      setDeferredPrompt(null);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-screen-sm rounded-t-md border bg-card p-3 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium">Install this app</p>
          {deferredPrompt ? (
            <p className="text-muted-foreground">Add it to your home screen for a better experience.</p>
          ) : isIOS && !isStandalone ? (
            <p className="text-muted-foreground">
              On iOS: tap the Share icon, then "Add to Home Screen" to install.
            </p>
          ) : (
            <p className="text-muted-foreground">Add it to your home screen for a better experience.</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {deferredPrompt ? <Button onClick={handleInstall}>Install</Button> : null}
          <Button variant="ghost" onClick={() => setVisible(false)}>Later</Button>
        </div>
      </div>
    </div>
  );
}