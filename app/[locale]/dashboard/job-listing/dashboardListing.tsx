'use client';
import React, { useState, useEffect } from 'react';
import { RiFileList3Line } from 'react-icons/ri';
import { useTranslations } from 'next-intl';
import { set } from 'date-fns';

import { Link, Toast, DashboardListingCard } from '@/components';
import { ToastTitle, UsersTypes, type ListingData, dashboardViewCounterDisplayType } from '@/types';
import { useToggle } from '@/hooks';


interface DashboardListingProps {
  jobPost: ListingData[];
  usedPromotion: number;
}

export const DashboardListing = ({ jobPost, usedPromotion }: DashboardListingProps) => {
  const t = useTranslations('dashboard');
  const [toastSuccessMessage, setToastSuccessMessage] = useState<string>('');
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');
  const [isPromotionSuccessful, setIsPromotionSuccessful] = useState<boolean>(false);
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };
  useEffect(() => {
    if (isPromotionSuccessful) {
      setToastSuccessMessage(t('jobListing.promotionSuccess'));
      toggleToast(true);
      setTimeout(() => {
        toggleToast(false);
      }, 3000);
    } else {
      setToastErrorMessage(t('jobListing.promotionFailed'));
      toggleToast(true);
      setTimeout(() => {
        toggleToast(false);
      }, 3000);
    }
  }, [isPromotionSuccessful]);

  return (
    <>
      {jobPost ? (
        <div className='flex flex-col gap-4'>
          <Toast
            isOpen={isToastOpen}
            onClose={handleCloseToast}
            title={isPromotionSuccessful ? ToastTitle.Success : ToastTitle.Error}
            message={isPromotionSuccessful ? toastSuccessMessage : toastErrorMessage}
          />
          {jobPost.map((jobPost) => (
            <DashboardListingCard
              key={jobPost.id}
              jobPost={jobPost}
              setIsPromotionSuccessful={setIsPromotionSuccessful}
              usedPromotion={usedPromotion}
            />
          ))}
          <div className='flex flex-col items-center gap-2 rounded border border-brand-lightbg p-2'>
            <span className='rounded-md border border-brand-gray p-3'>
              <RiFileList3Line size={28} />
            </span>
            <div className='gap- flex flex-col text-center'>
              <p className='text-sm font-medium'>{t('jobListing.moreJobListing')}</p>
              <p className='text-sm'>{t('jobListing.moreJobListingSub')}</p>
            </div>
            <Link
              href='/annonce/publier'
              className='flex items-center justify-center rounded-lg bg-brand-primary text-center text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <button type='button' className='h-11 px-4 text-sm'>
                {t('button.upgrade')}
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-3 rounded border border-brand-lightbg p-5'>
          <span className='rounded-md border border-brand-gray p-3'>
            <RiFileList3Line size={28} />
          </span>
          <div className='gap- flex flex-col text-center'>
            <p className='text-sm font-medium'>{t('jobListing.firstJobListing')}</p>
            <p className='text-sm'>{t('jobListing.firstJobListingSub')}</p>
          </div>
          <Link
            href='/annonce/publier'
            className='flex items-center justify-center rounded-lg bg-brand-primary text-center text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <button type='button' className='h-11 px-4 text-sm'>
              {t('button.postAJob')}
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
