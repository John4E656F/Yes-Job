'use server';
import React from 'react';
import { Image, Link, PostButton } from '..';
import { useTranslations } from 'next-intl';
import type { UsersTypes, CompanyTypes, ListingData, SessionTypes } from '@/types';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { refreshUserSession } from '@/lib/actions/refreshServerSession';

export const Hero = async () => {
  const t = useTranslations('app');
  const session = await getServerUserSession();
  let sessionId;
  if (session) {
    sessionId = session.user.id;
  } else {
    const session = await refreshUserSession();
    sessionId = session.user.id;
  }

  const response = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'
      ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/company/jobListing/${sessionId}`
      : process.env.NEXT_PRIVATE_URL + `/api/company/jobListing/${sessionId}`,
  );

  const { fetchedCompanyData, fetchedJobPostData } = await response.json();
  const companyData = fetchedCompanyData as CompanyTypes;
  const jobListing = fetchedJobPostData as ListingData[];
  // console.log('hero companyData', companyData);
  // console.log('hero jobListing', jobListing);

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
