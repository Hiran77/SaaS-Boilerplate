"use client";

import Link from 'next/link';
import { Logo } from '@/templates/Logo';

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-3">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <Link href="/" aria-label="Go to home">
            <Logo />
          </Link>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}