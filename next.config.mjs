import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

// Only validate env and enable Sentry plugin in production
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  jiti('./src/libs/Env');
}

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const baseConfig = bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ['.'],
    },
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
      serverComponentsExternalPackages: ['@electric-sql/pglite'],
    },
  }),
);

// In dev, export plain config; in prod, wrap with Sentry
export default isProd
  ? withSentryConfig(baseConfig, {
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
  : baseConfig;