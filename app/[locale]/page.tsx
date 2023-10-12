'use client';
import { useTranslations } from 'next-intl';
import { Hero, Listing } from '@/components';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const t = useTranslations('app');

  return (
    <div className='w-full items-center justify-center'>
      <Hero t={t} />
      <Listing />
    </div>
  );
}
