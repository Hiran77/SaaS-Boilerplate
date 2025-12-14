import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  // Validate env in production only
  jiti('./src/libs/Env');
}

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@electric-sql/pglite'],
  },
  // Speed up dev by skipping lint/type checks; enforce in production
  ...(isProd
    ? {
        eslint: { dirs: ['.'] },
      }
    : {
        eslint: { ignoreDuringBuilds: true },
        typescript: { ignoreBuildErrors: true },
      }),
};

// Apply next-intl plugin
nextConfig = withNextIntlConfig(nextConfig);

// Apply bundle analyzer plugin
nextConfig = bundleAnalyzer(nextConfig);

// Export with Sentry in production, plain in development
export default isProd
  ? withSentryConfig(nextConfig, {
      org: 'nextjs-boilerplate-org',
      project: 'nextjs-boilerplate',
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: '/monitoring',
      hideSourceMaps: true,
      disableLogger: true,
      automaticVercelMonitors: true,
      telemetry: false,
    })
  : nextConfig;