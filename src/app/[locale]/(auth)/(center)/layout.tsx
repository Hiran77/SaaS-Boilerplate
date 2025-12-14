import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AuthShell from '@/components/AuthShell';
import { Env } from '@/libs/Env';

export default async function CenteredLayout(props: { children: React.ReactNode }) {
  // If Clerk is not configured, render children without server-side auth check
  if (!Env.CLERK_SECRET_KEY) {
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