import React from 'react';
import { Image } from '..';
import Link from 'next/link';
import type { TranslationProps } from '@/types';

export const Hero = ({ t }: TranslationProps) => {
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center py-4 md:py-16 '>
        <div className='flex flex-col lg:flex-row gap-16 justify-between items-center '>
          <div className=' w-auto flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>{t('hero.title')}</h1>
            <h2 className='text-sm'>{t('hero.sub')}</h2>
            <Link href='/annonce'>
              <button
                data-collapse-toggle='navbar-default'
                type='button'
                className=' md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
                aria-controls='navbar-default'
                aria-expanded='false'
              >
                {t('cta.publish')}
              </button>
            </Link>
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto max-w-sm max-h-lg object-fill bg-blue-200 rounded-2xl' />
        </div>
      </div>
    </header>
  );
};
