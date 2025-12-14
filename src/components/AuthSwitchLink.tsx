"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { getI18nPath } from '@/utils/Helpers';

export default function AuthSwitchLink(props: { locale: string; mode: 'sign-in' | 'sign-up' }) {
  const t = useTranslations('Navbar');
  const otherPath = props.mode === 'sign-in' ? '/sign-up' : '/sign-in';
  const label = props.mode === 'sign-in' ? t('sign_up') : t('sign_in');

  return (
    <div className="mt-4 flex justify-center">
      <Link
        className={buttonVariants({ variant: 'ghost' })}
        href={getI18nPath(otherPath, props.locale)}
        prefetch={false}
      >
        {label}
      </Link>
    </div>
  );
}