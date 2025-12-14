import { getTranslations } from 'next-intl/server';

import AuthHeading from '@/components/AuthHeading';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import SignUpClient from '@/components/auth/SignUpClient';
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
    <SignUpClient locale={props.params.locale} />
    <AuthSwitchLink locale={props.params.locale} mode="sign-up" />
  </main>
);

export default SignUpPage;