import React from 'react';
import { Card, Image, Label, PromoteButton } from '..';
import { useTranslations } from 'next-intl';
import type { ListingData } from '@/types';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { timeDifference } from '@/utils';

interface ListingCardProps {
  jobPost: ListingData;
  setIsPromotionSuccessful: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  usedPromotion: number;
}

export function DashboardListingCard({ jobPost, setIsPromotionSuccessful, usedPromotion }: ListingCardProps) {
  // console.log('dashboard joblisting card', jobPost);

  const t = useTranslations('dashboard');

  return (
    <Card className='flex flex-col items-center md:flex-row ' pinned={false}>
      <div className='w-full block md:hidden pt-2 pr-2'>
        {!jobPost.expired && jobPost.published ? (
          <div className='flex flex-col gap-2 justify-end'>
            <div className='flex gap-4 text-right justify-end'>
              {jobPost.promoted && (
                <div className='flex gap-1 items-center'>
                  <IoDiamondOutline size={20} className='text-brand-primary' />
                  <p className='text-brand-primary'>{t('tags.promoted')}</p>
                </div>
              )}
              <p className='text-brand-success'>{t('tags.published')}</p>
            </div>
            {jobPost.promoted ? (
              <div className='flex gap-2 justify-end'>
                <Link
                  href={`/dashboard/job-listing/edit/${jobPost.id}`}
                  className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
                >
                  <button type='button' className='px-4 py-2 text-sm'>
                    {t('button.edit')}
                  </button>
                </Link>
              </div>
            ) : (
              <div className='flex gap-2 justify-end'>
                <PromoteButton jobPost={jobPost} setIsPromotionSuccessful={setIsPromotionSuccessful} usedPromotion={usedPromotion} />
                <Link
                  href={`/dashboard/job-listing/edit/${jobPost.id}`}
                  className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
                >
                  <button type='button' className='px-4 py-2 text-sm'>
                    {t('button.edit')}
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : !jobPost.expired && !jobPost.published ? (
          <div className='flex flex-col text-right gap-2'>
            <p className='text-brand-failed'>{t('tags.draft')}</p>
            <div className='flex justify-end'>
              <Link
                href={`/dashboard/job-listing/edit/${jobPost.id}`}
                className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
              >
                <button type='button' className='px-4 py-2 text-sm'>
                  {t('button.edit')}
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2 text-right'>
            <p className='text-brand-failed'>{t('tags.expired')}</p>
            <div className='flex justify-end'>
              <Link
                href={`/dashboard/job-listing/republish/${jobPost.id}`}
                className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
              >
                <button type='button' className='px-4 py-2 text-sm'>
                  {t('button.republish')}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Image
        src={jobPost.company?.logo as string}
        alt='Yes Job'
        className='w-20 m-5 h-20 md:w-24 md:h-24 object-contain bg-blue-200 rounded'
        unoptimized
      />
      <div className='py-1 pr-2 w-full'>
        <div className='flex justify-center md:justify-between items-center'>
          <div className='text-center md:text-left'>
            <h5 className='text-base font-semibold md:text-lg'>{jobPost.title}</h5>
            <p className='text-base md:text-lg'>{jobPost.company?.name}</p>
          </div>
          <div className='hidden md:block'>
            {!jobPost.expired && jobPost.published ? (
              <div className='flex flex-col gap-2'>
                <div className='flex gap-4 text-right justify-end'>
                  {jobPost.promoted && (
                    <div className='flex gap-1 items-center'>
                      <IoDiamondOutline size={20} className='text-brand-primary' />
                      <p className='text-brand-primary'>{t('tags.promoted')}</p>
                    </div>
                  )}
                  <p className='text-brand-success'>{t('tags.published')}</p>
                </div>
                {jobPost.promoted ? (
                  <div className='flex gap-2 justify-end'>
                    <Link
                      href={`/dashboard/job-listing/edit/${jobPost.id}`}
                      className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
                    >
                      <button type='button' className='px-4 py-2 text-sm'>
                        {t('button.edit')}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className='flex gap-2 justify-end'>
                    <PromoteButton jobPost={jobPost} setIsPromotionSuccessful={setIsPromotionSuccessful} usedPromotion={usedPromotion} />
                    <Link
                      href={`/dashboard/job-listing/edit/${jobPost.id}`}
                      className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
                    >
                      <button type='button' className='px-4 py-2 text-sm'>
                        {t('button.edit')}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ) : !jobPost.expired && !jobPost.published ? (
              <div className='flex flex-col justify-end text-right gap-2'>
                <p className='text-brand-failed'>{t('tags.draft')}</p>
                <div className='flex gap-2 '>
                  <Link
                    href={`/dashboard/job-listing/edit/${jobPost.id}`}
                    className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
                  >
                    <button type='button' className='px-4 py-2 text-sm'>
                      {t('button.edit')}
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-2 text-right'>
                <p className='text-brand-failed'>{t('tags.expired')}</p>
                <div className='flex gap-2'>
                  <Link
                    href={`/dashboard/job-listing/republish/${jobPost.id}`}
                    className='flex items-center justify-center text-center border border-gray-500 bg-brand-gray rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200'
                  >
                    <button type='button' className='px-4 py-2 text-sm'>
                      {t('button.republish')}
                    </button>
                  </Link>
                </div>
              </div>
            )}
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
            <Label text={`${t('card.fullTime')} +2`} type='WorkDuration' />
          ) : jobPost.fullTime && !jobPost.partTime ? (
            <Label text={t('card.fullTime')} type='WorkDuration' />
          ) : !jobPost.fullTime && jobPost.partTime ? (
            <Label text={t('card.partTime')} type='WorkDuration' />
          ) : null}
          {jobPost.experience ? (
            <Label text={t('card.experience')} type='noExp' className='block md:hidden lg:block' />
          ) : (
            <Label text={t('card.noExperience')} type='noExp' className='block md:hidden lg:block' />
          )}
        </div>
      </div>
    </Card>
  );
}
