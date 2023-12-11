'use server';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Image, Link, PostButton } from '..';
import type { CompanyTypes, ListingData } from '@/types';

interface HeroProps {
  jobListing: ListingData[];
  companyData: CompanyTypes;
}
export const Hero = ({ jobListing, companyData }: HeroProps) => {
  const t = useTranslations('app');
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center py-4 md:py-16 '>
        <div className='flex flex-col md:flex-row gap-4 justify-between items-center '>
          <div className=' w-auto flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>{t('hero.title')}</h1>
            <h2 className='text-sm font-normal'>{t('hero.sub')}</h2>
            <PostButton jobPost={jobListing} companyData={companyData} location='app' />
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto max-w-sm h-auto max-h-lg object-fill rounded-2xl' />
        </div>
      </div>
    </header>
  );
};
