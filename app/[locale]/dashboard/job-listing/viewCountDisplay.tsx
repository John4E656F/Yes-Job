import React from 'react';
import { getTranslations } from 'next-intl/server';

import type { dashboardViewCounterDisplayType } from '@/types';

export const ViewCountDisplay = async ({ totalViewCount }: { totalViewCount: dashboardViewCounterDisplayType }) => {
  const t = await getTranslations('dashboard');
  return (
    <div className='flex flex-col justify-between gap-6 md:flex-row'>
      <div className='flex flex-1 flex-col gap-4 rounded border border-black px-4 py-8 '>
        <p className='text-sm font-medium'>{t('jobListing.view24Hours')}</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount24Hours}</p>
      </div>
      <div className='flex flex-1 flex-col gap-4 rounded border border-black px-4 py-8 '>
        <p className='text-sm font-medium'>{t('jobListing.view7Days')}</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount7Days}</p>
      </div>
      <div className='flex flex-1 flex-col gap-4 rounded border border-black px-4 py-8 '>
        <p className='text-sm font-medium'>{t('jobListing.view30Days')}</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount30Days}</p>
      </div>
    </div>
  );
};
