import '@/styles/global.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { DemoBadge } from '@/components/DemoBadge';
import { AllLocales } from '@/utils/AppConfig';
import InstallAppPrompt from '@/components/InstallAppPrompt';
import ServiceWorkerUpdatePrompt from '@/components/ServiceWorkerUpdatePrompt';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
  manifest: '/manifest.webmanifest',
  themeColor: '#0f172a',
  // ADDED: iOS Apple web app metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SaaS Template',
  },
};

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          {/* PWA install prompt */}
          <InstallAppPrompt />
          {/* Prompt to update when a new service worker is available */}
          <ServiceWorkerUpdatePrompt />
          {props.children}

          <DemoBadge />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}