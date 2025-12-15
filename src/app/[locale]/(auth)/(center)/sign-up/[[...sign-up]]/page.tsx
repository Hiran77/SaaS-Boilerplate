import { getTranslations } from 'next-intl/server';

import AuthHeading from '@/components/AuthHeading';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import SignUpClient from '@/components/auth/SignUpClient';
import AuthConfigWarning from '@/components/auth/AuthConfigWarning';
import { Env } from '@/libs/Env';

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

export const dynamic = 'force-dynamic';

const SignUpPage = (props: { params: { locale: string } }) => {
  const hasClerkSecret = !!Env.CLERK_SECRET_KEY && !/^your_/i.test(String(Env.CLERK_SECRET_KEY));

  return (
    <main className="mx-auto w-full max-w-md px-3 sm:px-0">
      <AuthHeading namespace="SignUp" />
      {hasClerkSecret ? (
        <>
          <SignUpClient locale={props.params.locale} />
          <AuthSwitchLink locale={props.params.locale} mode="sign-up" />
        </>
      ) : (
        <AuthConfigWarning mode="sign-up" />
      )}
    </main>
  );
};

export default SignUpPage;