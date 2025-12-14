"use client";

import { SignIn } from '@clerk/nextjs';
import { getI18nPath } from '@/utils/Helpers';

export default function SignInClient({ locale }: { locale: string }) {
  return (
    <SignIn
      path={getI18nPath('/sign-in', locale)}
      routing="path"
      appearance={{
        elements: { rootBox: 'w-full', cardBox: 'w-full' },
        variables: { colorPrimary: '#0f172a', borderRadius: '0.5rem' },
      }}
      afterSignInUrl={getI18nPath('/dashboard', locale)}
    />
  );
}