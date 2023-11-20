'use server';
import React from 'react';
import { Image, Link } from '..';
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('app');
  // const isLoginPage = pathname === '/auth/login';
  // const isRegisterPage = pathname === '/auth/register';
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center py-4 md:py-16 '>
        <div className='flex flex-col md:flex-row gap-4 justify-between items-center '>
          <div className=' w-auto flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>{t('hero.title')}</h1>
            <h2 className='text-sm font-normal'>{t('hero.sub')}</h2>
            <Link
              href='/annonce'
              className='md:block md:w-auto lg:max-w-xs flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <button type='button' className='px-4 h-11 text-sm'>
                {t('cta.publish')}
              </button>
            </Link>
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto max-w-sm h-auto max-h-lg object-fill rounded-2xl' />
        </div>
      </div>
    </header>
  );
};
