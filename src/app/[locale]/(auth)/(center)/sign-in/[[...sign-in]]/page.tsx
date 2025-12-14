import { getTranslations } from 'next-intl/server';

import AuthHeading from '@/components/AuthHeading';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import SignInClient from '@/components/auth/SignInClient';
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
    <SignInClient locale={props.params.locale} />
    <AuthSwitchLink locale={props.params.locale} mode="sign-in" />
  </main>
);

export default SignInPage;