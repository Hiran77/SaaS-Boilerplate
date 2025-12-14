"use client";

import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md rounded-lg border bg-card p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold">You're offline</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It looks like there's no internet connection. Please check your network and try again.
        </p>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    </div>
  );
}