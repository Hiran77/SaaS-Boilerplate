"use client";

import Link from 'next/link';

export default function AuthConfigWarning({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-card p-4 text-sm shadow-sm sm:p-6">
      <h2 className="text-base font-semibold">Authentication not configured</h2>
      <p className="mt-2 text-muted-foreground">
        {`We can’t ${mode.replace('-', ' ')} because Clerk is not fully configured.`}
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        <li>Add your real CLERK_SECRET_KEY to .env.local (do not use “your_clerk_secret_key”).</li>
        <li>Ensure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is your actual publishable key.</li>
        <li>Add this app’s URL to Allowed Origins/Redirect URLs in the Clerk Dashboard.</li>
      </ul>
      <p className="mt-3">
        After updating the environment, restart the app and try again. You can also review the setup steps in the README.
      </p>
      <div className="mt-4">
        <Link className="underline" href="/">Go back home</Link>
      </div>
    </div>
  );
}