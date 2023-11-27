'use client';
import React from 'react';
import { Button } from '..';
import { IoDiamondOutline } from 'react-icons/io5';
import type { ListingData } from '@/types';
import { promote } from '@/lib/actions';

interface PromoteButtonProps {
  jobPost: ListingData;
  setIsPromotionSuccessful: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  usedPromotion: number;
}
export function PromoteButton({ jobPost, setIsPromotionSuccessful, usedPromotion }: PromoteButtonProps) {
  const onClickPromote = async () => {
    if (jobPost.promoted) {
      return setIsPromotionSuccessful(false);
    }

    if (jobPost.companyId.availablePromotion === usedPromotion) {
      setIsPromotionSuccessful(false);
    } else {
      const itemId = jobPost.id!;
      const reponse = await promote({ itemId: itemId, path: `/dashboard/job-listing` });
      if (reponse.type === 'error') {
        setIsPromotionSuccessful(false);
      }
      setIsPromotionSuccessful(true);
    }
  };

  return (
    <Button
      className='flex items-center justify-center text-center border border-brand-primary bg-gray-100 rounded-full hover:bg-white'
      text={
        <div className='flex gap-2 justify-center items-center px-4 py-2 text-sm text-brand-primary'>
          <IoDiamondOutline size={15} />
          <p>Promote</p>
        </div>
      }
      btnType='button'
      onClick={onClickPromote}
    />
  );
}
