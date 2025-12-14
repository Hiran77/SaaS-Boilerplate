import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';
import { getI18nPath } from '@/utils/Helpers';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  const signInHref = getI18nPath('/sign-in', locale);
  const signUpHref = getI18nPath('/sign-up', locale);

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            {/* PRO: Dark mode toggle button */}
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href={signInHref} prefetch={false}>{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href={signUpHref} prefetch={false}>
                {t('sign_up')}
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href={signUpHref} prefetch={false}>{t('product')}</Link>
        </li>

        <li>
          <Link href={signUpHref} prefetch={false}>{t('docs')}</Link>
        </li>

        <li>
          <Link href={signUpHref} prefetch={false}>{t('blog')}</Link>
        </li>

        <li>
          <Link href={signUpHref} prefetch={false}>{t('community')}</Link>
        </li>

        <li>
          <Link href={signUpHref} prefetch={false}>{t('company')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};