import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components';

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
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='flex flex-col items-center'>
      <Navbar currentLocale={locale} session={session} />
      <section>
        <main className='flex flex-col items-center'>{children}</main>
      </section>
      <Footer />
    </div>
  );
}
