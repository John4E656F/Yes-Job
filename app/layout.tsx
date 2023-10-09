import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Navbar, Footer } from '@/components';

export const metadata = {
  title: 'Yes Job',
  description: 'Trouver les meilleures offres d’emploi dans horeca',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <main className='flex flex-col items-center'>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
