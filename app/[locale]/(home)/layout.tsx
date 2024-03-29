import { notFound } from 'next/navigation';
import { Navbar, Footer, CookieConsentPopup, AnnouncementBar } from '@/components';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/navigation';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '../../globals.css';

interface HomeLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<HomeLayoutProps, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'HomeLayout' });

  return {
    title: t('title'),
  };
}

export default async function HomeLayout({ children, params: { locale } }: HomeLayoutProps) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);

  let translation;
  try {
    translation = (await import(`../../../translation/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const session = await getServerUserSession();
  // console.log('layout session', session);

  return (
    <html lang={locale}>
      <body className='flex flex-col'>
        <NextIntlClientProvider locale={locale} messages={translation}>
          {!session && <AnnouncementBar />}
          <Navbar currentLocale={locale} session={session} />
          <section>
            <main className='flex flex-col items-center'>
              {children}
              <SpeedInsights />
            </main>
          </section>
          <Footer />
          <CookieConsentPopup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
