'use client';
import React from 'react';
import { Button } from '..';
import { IoDiamondOutline } from 'react-icons/io5';
import type { ListingData } from '@/types';
import { promote } from '@/lib/actions';
import { useTranslations } from 'next-intl';

interface PromoteButtonProps {
  jobPost: ListingData;
  setIsPromotionSuccessful: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  usedPromotion: number;
}
export function PromoteButton({ jobPost, setIsPromotionSuccessful, usedPromotion }: PromoteButtonProps) {
  const t = useTranslations('dashboard');

  const onClickPromote = async () => {
    if (jobPost.promoted) {
      setIsPromotionSuccessful(false);
      setTimeout(() => {
        setIsPromotionSuccessful(undefined);
      }, 3000);
      return;
    }

    if (jobPost.company.availableBoost === usedPromotion) {
      setIsPromotionSuccessful(false);
      setTimeout(() => {
        setIsPromotionSuccessful(undefined);
      }, 3000);
    } else {
      const itemId = jobPost.id!;
      const reponse = await promote({ itemId: itemId, path: `/dashboard/job-listing` });
      if (reponse.type === 'error') {
        setIsPromotionSuccessful(false);
        setTimeout(() => {
          setIsPromotionSuccessful(undefined);
        }, 3000);
      }
      setIsPromotionSuccessful(true);
      setTimeout(() => {
        setIsPromotionSuccessful(undefined);
      }, 3000);
    }
  };

  return (
    <Button
      className='flex items-center justify-center text-center border border-brand-primary bg-gray-100 rounded-full hover:bg-white'
      text={
        <div className='flex gap-2 justify-center items-center px-4 py-2 text-sm text-brand-primary'>
          <IoDiamondOutline size={15} />
          <p>{t('button.promote')}</p>
        </div>
      }
      btnType='button'
      onClick={onClickPromote}
    />
  );
}
