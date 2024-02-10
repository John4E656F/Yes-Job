import React from 'react';
import { Card, Image, Label } from '..';
import { useTranslations } from 'next-intl';
import type { ListingData, TranslationProps } from '@/types';
import Link from 'next/link';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { timeDifference } from '@/utils';

interface ListingCardProps {
  jobPost: ListingData;
}

export function ListingCard({ jobPost }: ListingCardProps) {
  const t = useTranslations('app');
  console.log(jobPost);

  return (
    <Link href={`/annonce/${jobPost.id}`}>
      <Card className='flex flex-col relative items-center p-1 md:flex-row md:p-2'>
        <Image
          src={jobPost.company?.logo as string}
          alt='Yes Job'
          className='w-20 m-5 h-20 md:w-24 md:h-24 object-contain bg-blue-200 rounded'
          unoptimized
        />
        <div>
          <div className='text-center md:text-left'>
            <h5 className='text-base font-semibold md:text-lg'>{jobPost.title}</h5>
            <p className='text-base md:text-lg'>{jobPost.company?.name}</p>
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
        <p className='hidden md:block mt-auto ml-auto text-right whitespace-nowrap'>{timeDifference(jobPost.created_at || '', { t })}</p>
      </Card>
    </Link>
  );
}
