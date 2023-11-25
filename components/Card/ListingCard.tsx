import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BsFillPinAngleFill } from 'react-icons/bs';

import type { ListingData, TranslationProps } from '@/types';
import { Card, Image, Label } from '..';
import { timeDifference } from '@/utils';

interface ListingCardProps {
  jobPost: ListingData;
}

export function ListingCard({ jobPost }: ListingCardProps) {
  const t = useTranslations('app');
  return (
    <Link href={`/annonce/${jobPost.id}`}>
      <Card className='relative flex flex-col items-center p-1 md:flex-row md:p-2' pinned={jobPost.pinned}>
        {jobPost.pinned && (
          <div className='absolute right-0 top-0 -translate-y-1/2 translate-x-1/2'>
            <BsFillPinAngleFill size={30} className='text-blue-500' />
          </div>
        )}
        <Image
          src={jobPost.companyId?.user_logo as string}
          alt='Yes Job'
          className='m-5 h-20 w-20 rounded bg-blue-200 object-contain md:h-24 md:w-24'
          unoptimized
        />
        <div>
          <div className='text-center md:text-left'>
            <h5 className='text-base font-semibold md:text-lg'>{jobPost.title}</h5>
            <p className='text-base md:text-lg'>{jobPost.companyId?.user_name}</p>
          </div>
          <div className='flex flex-wrap justify-center gap-2.5 py-4 md:justify-start md:py-1'>
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
        <p className='ml-auto mt-auto hidden whitespace-nowrap text-right md:block'>{timeDifference(jobPost.created_at || '', { t })}</p>
      </Card>
    </Link>
  );
}
