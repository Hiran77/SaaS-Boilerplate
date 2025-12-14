import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AuthShell from '@/components/AuthShell';
import { Env } from '@/libs/Env';

export default async function CenteredLayout(props: { children: React.ReactNode }) {
  // If Clerk is not configured (or placeholder value), render children without server-side auth check
  const hasClerkSecret = !!Env.CLERK_SECRET_KEY && !/^your_/i.test(String(Env.CLERK_SECRET_KEY));
  if (!hasClerkSecret) {
    return <AuthShell>{props.children}</AuthShell>;
  }

  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <AuthShell>{props.children}</AuthShell>
  );
}