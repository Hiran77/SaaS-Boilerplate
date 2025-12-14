import { unstable_setRequestLocale } from 'next-intl/server';

import { AppConfig } from '@/utils/AppConfig';

export const dynamic = 'force-static';

export default function AndroidGuidePage(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Android App</h1>
      <p className="mt-2 text-muted-foreground">
        This app supports installation on Android via Progressive Web App (PWA). You can add it to your home screen directly from Chrome.
      </p>

      <div className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Install via PWA</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>Open the app in Chrome on Android.</li>
          <li>Use the “Install” prompt (or Add to Home Screen) to install a standalone experience.</li>
        </ul>
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Publish to Google Play (Trusted Web Activity)</h2>
        <p className="text-sm text-muted-foreground">
          To ship a native-like Android app using your web app:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>Create an Android app that opens your site in a Trusted Web Activity (TWA).</li>
          <li>Use your production domain (set via NEXT_PUBLIC_APP_URL) that serves this app.</li>
          <li>Sign your Android app and obtain its SHA-256 certificate fingerprint.</li>
          <li>Update <code className="rounded bg-muted px-1 py-0.5">/.well-known/assetlinks.json</code> with your package name and SHA-256 fingerprint so Play verifies ownership.</li>
          <li>Ensure your PWA manifest and service worker are present (already added).</li>
          <li>Upload the app to Google Play with your metadata and assets.</li>
        </ul>
        <p className="mt-3 text-sm">
          Your current default locale is <span className="font-medium">{AppConfig.defaultLocale}</span>. Visit <code className="rounded bg-muted px-1 py-0.5">/{AppConfig.defaultLocale}/android</code> to view this guide in the app.
        </p>
      </div>
    </div>
  );
}