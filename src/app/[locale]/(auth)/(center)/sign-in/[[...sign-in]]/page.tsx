"use client";

import { getTranslations } from 'next-intl/server';
import { SignIn } from '@clerk/nextjs';

import AuthHeading from '@/components/AuthHeading';
import { getI18nPath } from '@/utils/Helpers';

// Direct client render of Clerk SignIn

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: true },
  };
}

const SignInPage = (props: { params: { locale: string } }) => (
  <main className="mx-auto w-full max-w-md px-3 sm:px-0">
    <AuthHeading namespace="SignIn" />
    <SignIn
      path={getI18nPath('/sign-in', props.params.locale)}
      routing="path"
      appearance={{
        elements: { rootBox: 'w-full', cardBox: 'w-full' },
        variables: { colorPrimary: '#0f172a', borderRadius: '0.5rem' },
      }}
      afterSignInUrl={getI18nPath('/dashboard', props.params.locale)}
    />
  </main>
);

export default SignInPage;