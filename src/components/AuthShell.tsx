"use client";

import Link from 'next/link';
import { Logo } from '@/templates/Logo';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-3">
      <div className="w-full max-w-md">
        <header className="mb-6 flex items-center justify-between">
          <Link href="/" aria-label="Go to home" className="inline-flex items-center">
            <Logo />
          </Link>
          <LocaleSwitcher />
        </header>
        <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}