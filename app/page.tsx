import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Hero, Listing } from '@/components';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: countries } = await supabase.from('countries').select();

  return (
    <div className='w-full items-center justify-center'>
      <Hero />
      <Listing />
    </div>
  );
}
