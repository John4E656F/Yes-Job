import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Image, Button } from '..';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('app');
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth/login';
  const isRegisterPage = pathname === '/auth/register';
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center py-4 md:py-16 '>
        <div className='flex flex-col lg:flex-row gap-16 justify-between items-center '>
          <div className=' w-auto flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>{t('hero.title')}</h1>
            <h2 className='text-sm'>{t('hero.sub')}</h2>
            <Button
              text={t('cta.publish')}
              btnType='button'
              className=' md:block md:w-auto lg:max-w-xs items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200 '
              onClick={() => router.push('/annonce')}
            />
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto max-w-sm max-h-lg object-fill bg-blue-200 rounded-2xl' />
        </div>
      </div>
    </header>
  );
};
