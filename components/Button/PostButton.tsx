'use client';
import React from 'react';
import { Button } from '..';
import { useRouter } from 'next/navigation';
import type { ListingData } from '@/types';
import { useTranslations } from 'next-intl';

interface PostButtonProps {
  jobPost: ListingData[];
  setIsPostError?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
export function PostButton({ jobPost, setIsPostError }: PostButtonProps) {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const onClickEdit = async () => {
    let usedListing = [];
    if (jobPost) {
      usedListing = jobPost.filter((listing) => listing.published === true);
    }

    // Assuming all listings in jobPost are from the same company
    const availableJobListing = jobPost.length > 0 ? jobPost[0].company.availableJobListing : null;
    if (setIsPostError) {
      if (availableJobListing === usedListing.length) {
        setIsPostError(true);
      } else {
        router.push(`/publier`);
        setIsPostError(false);
      }
    }
  };

  return (
    <Button
      className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
      text={<p className='px-4 h-11 text-sm'>{t('button.postAJob')}</p>}
      btnType='button'
      onClick={onClickEdit}
    />
  );
}
