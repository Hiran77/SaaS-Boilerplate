import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/sign-in',
          '/sign-up',
          '/fr/sign-in',
          '/fr/sign-up',
        ],
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}