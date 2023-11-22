import React from 'react';
import { Card, Image, Label } from '..';
import { useTranslations } from 'next-intl';
import type { ListingData } from '@/types';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { timeDifference } from '@/utils';

interface ListingCardProps {
  jobPost: ListingData;
}

export function DashboardListingCard({ jobPost }: ListingCardProps) {
  console.log(jobPost);

  const t = useTranslations('app');
  return (
    <Card className='flex flex-col relative items-center md:flex-row ' pinned={false}>
      <Image
        src={jobPost.companyId?.user_logo as string}
        alt='Yes Job'
        className='w-20 m-5 h-20 md:w-24 md:h-24 object-contain bg-blue-200 rounded'
        unoptimized
      />
      <div className='py-1 pr-2 w-full'>
        <div className='flex justify-between'>
          <div className='text-center md:text-left'>
            <h5 className='text-base font-semibold md:text-lg'>{jobPost.title}</h5>
            <p className='text-base md:text-lg'>{jobPost.companyId?.user_name}</p>
          </div>
          <div>
            <div className='flex gap-4'>
              {jobPost.promoted && (
                <div className='flex gap-1 items-center'>
                  <IoDiamondOutline size={20} className='text-brand-primary' />
                  <p className='text-brand-primary'>Promoted</p>
                </div>
              )}
              {jobPost.published ? <p className='text-brand-success'>Published</p> : <p className='text-brand-failed'>Draft</p>}
            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
          <Label text={jobPost.location} type='location' />
          {jobPost.salaryMin ? (
            <Label text={'€ ' + jobPost.salaryMin} type='salary' />
          ) : jobPost.salaryMax ? (
            <Label text={'€ ' + jobPost.salaryMax} type='salary' />
          ) : null}
          {jobPost.cdd && jobPost.cdi ? (
            <Label text='CDD +2' type='WorkDuration' />
          ) : jobPost.cdd && !jobPost.cdi ? (
            <Label text='CDD' type='WorkDuration' />
          ) : !jobPost.cdd && jobPost.cdi ? (
            <Label text='CDI' type='WorkDuration' />
          ) : null}
          {jobPost.fullTime && jobPost.partTime ? (
            <Label text={`${t('listing.fullTime')} +2`} type='WorkDuration' />
          ) : jobPost.fullTime && !jobPost.partTime ? (
            <Label text={t('listing.fullTime')} type='WorkDuration' />
          ) : !jobPost.fullTime && jobPost.partTime ? (
            <Label text={t('listing.partTime')} type='WorkDuration' />
          ) : null}
          {jobPost.experience ? (
            <Label text={t('listing.experience')} type='noExp' className='block md:hidden lg:block' />
          ) : (
            <Label text={t('listing.noExperience')} type='noExp' className='block md:hidden lg:block' />
          )}
        </div>
      </div>
    </Card>
  );
}
