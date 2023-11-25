import React from 'react';
import type { dashboardViewCounterDisplayType } from '@/types';
import { getTranslations } from 'next-intl/server';

export const ViewCountDisplay = async ({ totalViewCount }: { totalViewCount: dashboardViewCounterDisplayType }) => {
  const t = await getTranslations('dashboard');
  return (
    <div className='flex flex-col md:flex-row justify-between gap-6'>
      <div className='flex flex-col flex-1 gap-4 py-8 px-4 border border-black rounded '>
        <p className='text-sm font-medium'>{t('jobListing.view24Hours')}</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount24Hours}</p>
      </div>
      <div className='flex flex-col flex-1 gap-4 py-8 px-4 border border-black rounded '>
        <p className='text-sm font-medium'>{t('jobListing.view7Days')}</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount7Days}</p>
      </div>
      <div className='flex flex-col flex-1 gap-4 py-8 px-4 border border-black rounded '>
        <p className='text-sm font-medium'>{t('jobListing.view30Days')}</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount30Days}</p>
      </div>
    </div>
  );
};
