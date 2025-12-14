import * as Sentry from '@sentry/nextjs';

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  // If no DSN is set, skip Sentry initialization entirely
  if (!dsn) {
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn,
      spotlight: process.env.NODE_ENV === 'development',
      tracesSampleRate: 1,
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn,
      spotlight: process.env.NODE_ENV === 'development',
      tracesSampleRate: 1,
      debug: false,
    });
  }
}