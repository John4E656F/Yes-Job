'use server';
import React from 'react';
import { useTranslations } from 'next-intl';

import { Image, Link } from '..';

export const Hero = () => {
  const t = useTranslations('app');
  // const isLoginPage = pathname === '/auth/login';
  // const isRegisterPage = pathname === '/auth/register';
  return (
    <header className='flex w-full justify-center'>
      <div className='container flex flex-col justify-center py-4 md:py-16 '>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row '>
          <div className=' flex w-auto flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>{t('hero.title')}</h1>
            <h2 className='text-sm font-normal'>{t('hero.sub')}</h2>
            <Link
              href='/annonce'
              className='flex items-center justify-center rounded-lg bg-brand-primary text-center text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 md:block md:w-auto lg:max-w-xs'
            >
              <button type='button' className='h-11 px-4 text-sm'>
                {t('cta.publish')}
              </button>
            </Link>
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='max-h-lg h-auto w-auto max-w-sm rounded-2xl object-fill' />
        </div>
      </div>
    </header>
  );
};
