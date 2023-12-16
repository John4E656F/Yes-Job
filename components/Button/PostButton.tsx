'use client';
import React from 'react';
import { Button, Toast } from '..';
import { useRouter } from 'next/navigation';
import { ToastTitle, type ListingData, CompanyTypes } from '@/types';
import { useTranslations } from 'next-intl';
import { useToggle } from '@/hooks';

interface PostButtonProps {
  jobPost?: ListingData[];
  companyData?: CompanyTypes;
  location: string;
}
export function PostButton({ jobPost, companyData, location }: PostButtonProps) {
  const t = useTranslations(location === 'app' ? 'app' : 'dashboard');
  const router = useRouter();

  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

  const onClickEdit = async () => {
    if (jobPost && companyData) {
      let usedListing = [];
      if (jobPost) {
        usedListing = jobPost.filter((listing) => listing.published === true);
      }

      if (companyData.availableJobListing === usedListing.length) {
        toggleToast(true);
        setTimeout(() => {
          toggleToast(false);
        }, 10000);
      } else {
        router.push(`/publier`);
      }
    } else {
      router.push(`/annonce/publier`);
    }
  };

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  return (
    <>
      <Toast isOpen={isToastOpen} onClose={handleCloseToast} title={ToastTitle.Error} message={t('error.notEnoughListing')} />
      <Button
        className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
        text={<p className='px-4 h-11 text-sm flex items-center'>{t('cta.publish')}</p>}
        btnType='button'
        onClick={onClickEdit}
      />
    </>
  );
}
