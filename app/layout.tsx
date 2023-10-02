import './globals.css';
import { Navbar } from '@/components';

export const metadata = {
  title: 'Yes Job',
  description: 'Trouver les meilleures offres d’emploi dans horeca',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen flex flex-col items-center'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
