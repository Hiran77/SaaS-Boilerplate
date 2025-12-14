import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AuthShell from '@/components/AuthShell';

export default async function CenteredLayout(props: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return <AuthShell>{props.children}</AuthShell>;
}