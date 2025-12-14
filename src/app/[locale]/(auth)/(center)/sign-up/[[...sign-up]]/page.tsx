import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

import AuthHeading from '@/components/AuthHeading';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import { getI18nPath } from '@/utils/Helpers';

const SignUpComponent = dynamic(
  () => import('@clerk/nextjs').then(m => m.SignUp),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-md animate-pulse rounded-lg border bg-card p-6 shadow-sm" />
    ),
  },
);

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
    <SignUpComponent
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