import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

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
  };
}

const SignUpPage = (props: { params: { locale: string } }) => (
  <div className="mx-auto w-full max-w-md px-3 sm:px-0">
    <SignUpComponent
      path={getI18nPath('/sign-up', props.params.locale)}
      appearance={{ elements: { rootBox: 'w-full', cardBox: 'w-full' } }}
    />
  </div>
);

export default SignUpPage;