"use client";

import { SignUp } from '@clerk/nextjs';
import { getI18nPath } from '@/utils/Helpers';

export default function SignUpClient({ locale }: { locale: string }) {
  return (
    <SignUp
      path={getI18nPath('/sign-up', locale)}
      routing="path"
      appearance={{
        elements: { rootBox: 'w-full', cardBox: 'w-full' },
        variables: { colorPrimary: '#0f172a', borderRadius: '0.5rem' },
      }}
      afterSignUpUrl={getI18nPath('/dashboard', locale)}
    />
  );
}