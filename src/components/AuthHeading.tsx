"use client";

import { useTranslations } from 'next-intl';

export default function AuthHeading({ namespace }: { namespace: 'SignIn' | 'SignUp' }) {
  const t = useTranslations(namespace);
  return <h1 className="sr-only">{t('meta_title')}</h1>;
}