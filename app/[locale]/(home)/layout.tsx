import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components';

interface HomeLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function HomeLayout({ children, params }: HomeLayoutProps) {
  return (
    <div className='flex flex-col items-center'>
      <Navbar />
      <section>
        <main className='flex flex-col items-center'>{children}</main>
      </section>
      <Footer />
    </div>
  );
}
