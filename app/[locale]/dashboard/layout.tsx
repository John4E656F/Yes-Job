import { notFound, redirect } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/navigation';
import { Sidebar, MobileNavbar, Footer } from '@/components';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
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

  if (!session) {
    redirect('/');
  }
  return (
    <html lang={locale}>
      <body className='flex flex-col'>
        <NextIntlClientProvider locale={locale} messages={translation}>
          <Sidebar currentLocale={locale} session={session} />
          <MobileNavbar currentLocale={locale} session={session} />
          <main className='flex flex-grow flex-col items-center bg-blue-200 md:ml-64'>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
