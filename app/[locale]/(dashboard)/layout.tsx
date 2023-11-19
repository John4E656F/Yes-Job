import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Sidebar, Footer } from '@/components';

interface HomeLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function HomeLayout({ children, params }: HomeLayoutProps) {
  const validLocales = ['en', 'fr', 'nl'];
  let locale = params?.locale ?? 'en';

  if (!validLocales.includes(locale)) {
    // logger.warn(`Invalid locale "${locale}" provided. Defaulting to "en".`);
    locale = 'en';
  }

  let translation;
  try {
    translation = (await import(`../../../translation/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <div className='flex'>
      <Sidebar currentLocale={locale} />
      <main className='flex flex-grow flex-col items-center bg-blue-200 ml-64'>{children}</main>
    </div>
  );
}
