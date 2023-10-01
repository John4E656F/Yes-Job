import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Navbar, Image } from '@/components';
import SupabaseLogo from '../components/SupabaseLogo';
import NextJsLogo from '../components/NextJsLogo';
import DeployButton from '../components/DeployButton';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: countries } = await supabase.from('countries').select();

  return (
    <div className='container items-center justify-center'>
      <Navbar />
      <div className='flex flex-col container py-4 md:py-16 '>
        <div className='flex flex-col md:flex-row justify-between '>
          <div className='bg-blue-500 w-auto'>Hello World</div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto max-w-sm h-full object-fill bg-blue-200 rounded-2xl' />
        </div>
      </div>
    </div>
  );
}
