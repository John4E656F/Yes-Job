'use client';
import { useTranslations } from 'next-intl';
import { Hero, Listing } from '@/components';
import { useStore } from '@/lib/store';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getUserData() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export default async function Index() {
  const t = useTranslations('app');

  const setUser = useStore((state) => state.setUser);

  const user = useStore((state) => ({
    id: state.id,
    email: state.email,
    phone: state.phone,
  }));

  if (user.id == '') {
    const userData = await getUserData();
    if (userData) {
      setUser(userData);
    }
  }
  return (
    <div className='w-full items-center justify-center'>
      <Hero t={t} />
      <Listing t={t} />
    </div>
  );
}
