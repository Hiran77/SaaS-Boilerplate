import { redirect } from 'next/navigation';

import { AppConfig } from '@/utils/AppConfig';

export default function RootRedirect() {
  redirect(`/${AppConfig.defaultLocale}`);
}