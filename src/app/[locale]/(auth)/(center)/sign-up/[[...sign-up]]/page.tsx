"use client";

import { getTranslations } from 'next-intl/server';
import { SignUp } from '@clerk/nextjs';

import AuthHeading from '@/components/AuthHeading';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import { getI18nPath } from '@/utils/Helpers';

// Direct client render of Clerk SignUp

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: true },
  };
}

const SignUpPage = (props: { params: { locale: string } }) => (
  <main className="mx-auto w-full max-w-md px-3 sm:px-0">
    <AuthHeading namespace="SignUp" />
    <SignUp
      path={getI18nPath('/sign-up', props.params.locale)}
      routing="path"
      appearance={{
        elements: { rootBox: 'w-full', cardBox: 'w-full' },
        variables: { colorPrimary: '#0f172a', borderRadius: '0.5rem' },
      }}
      afterSignUpUrl={getI18nPath('/dashboard', props.params.locale)}
    />
    <AuthSwitchLink locale={props.params.locale} mode="sign-up" />
  </main>
);

export default SignUpPage;