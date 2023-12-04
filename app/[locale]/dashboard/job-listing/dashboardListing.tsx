'use client';
import React, { useState, useEffect } from 'react';
import { Link, Toast, DashboardListingCard } from '@/components';
import { ToastTitle, UsersTypes, type ListingData, dashboardViewCounterDisplayType } from '@/types';
import { RiFileList3Line } from 'react-icons/ri';
import { useToggle } from '@/hooks';
import { useTranslations } from 'next-intl';

interface DashboardListingProps {
  jobPost?: ListingData[];
  usedPromotion?: number;
}

export const DashboardListing = ({ jobPost, usedPromotion }: DashboardListingProps) => {
  console.log('dashboard joblisting', jobPost);
  console.log('dashboard usedPromotion', usedPromotion);

  const t = useTranslations('dashboard');
  const [toastSuccessMessage, setToastSuccessMessage] = useState<string>('');
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');
  const [isPromotionSuccessful, setIsPromotionSuccessful] = useState<boolean>();
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
    } else if (isPromotionSuccessful === false) {
      setToastErrorMessage(t('jobListing.promotionFailed'));
      toggleToast(true);
      setTimeout(() => {
        toggleToast(false);
      }, 3000);
    }
  }, [isPromotionSuccessful]);

  return (
    <>
      {jobPost && jobPost.length > 0 && typeof usedPromotion === 'number' ? (
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
          <div className='flex flex-col gap-2 p-2 items-center border border-brand-lightbg rounded'>
            <span className='p-3 border border-brand-gray rounded-md'>
              <RiFileList3Line size={28} />
            </span>
            <div className='flex flex-col gap- text-center'>
              <p className='text-sm font-medium'>{t('jobListing.moreJobListing')}</p>
              <p className='text-sm'>{t('jobListing.moreJobListingSub')}</p>
            </div>
            <Link
              href='/annonce/publier'
              className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <button type='button' className='px-4 h-11 text-sm'>
                {t('button.upgrade')}
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 p-5 items-center border border-brand-lightbg rounded'>
          <span className='p-3 border border-brand-gray rounded-md'>
            <RiFileList3Line size={28} />
          </span>
          <div className='flex flex-col gap- text-center'>
            <p className='text-sm font-medium'>{t('jobListing.firstJobListing')}</p>
            <p className='text-sm'>{t('jobListing.firstJobListingSub')}</p>
          </div>
          <Link
            href='/annonce/publier'
            className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <button type='button' className='px-4 h-11 text-sm'>
              {t('button.postAJob')}
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
