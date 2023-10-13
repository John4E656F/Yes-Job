import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import '../globals.css';
import { Navbar, Footer } from '@/components';
import { useStore } from '@/lib/store';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata = {
  title: 'Yes Job',
  description: 'Trouver les meilleures offres d’emploi dans horeca',
};

async function getUserData() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const validLocales = ['en', 'fr', 'nl'];
  let locale = params?.locale ?? 'en';

  if (!validLocales.includes(locale)) {
    // logger.warn(`Invalid locale "${locale}" provided. Defaulting to "en".`);
    locale = 'en';
  }

  let translation;
  try {
    translation = (await import(`../../translation/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const setUser = useStore((state) => state.setUser);

  const user = useStore((state) => ({
    id: state.id,
    email: state.email,
    phone: state.phone,
  }));

  if (user.id == '') {
    const userData = await getUserData();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={translation}>
          <main className='flex flex-col items-center'>
            <Navbar currentLocale={locale} />
            {children}
            <Footer />
            <Analytics />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
