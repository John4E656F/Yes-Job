import React from 'react';
import type { dashboardViewCounterDisplayType } from '@/types';

export const ViewCountDisplay = ({ totalViewCount }: { totalViewCount: dashboardViewCounterDisplayType }) => {
  return (
    <div className='flex justify-between gap-6'>
      <div className='flex flex-col flex-1 gap-4 py-8 px-4 border border-black rounded '>
        <p className='text-sm font-medium'>Views 24 hours</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount24Hours}</p>
      </div>
      <div className='flex flex-col flex-1 gap-4 py-8 px-4 border border-black rounded '>
        <p className='text-sm font-medium'>Views 7 days</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount7Days}</p>
      </div>
      <div className='flex flex-col flex-1 gap-4 py-8 px-4 border border-black rounded '>
        <p className='text-sm font-medium'>Views 30 days</p>
        <p className='text-7xl font-semibold'>{totalViewCount.totalViewCount30Days}</p>
      </div>
    </div>
  );
};
