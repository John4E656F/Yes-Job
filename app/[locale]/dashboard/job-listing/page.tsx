//NOTE: Have a filter function to filter expired, promoted, and draft listings
//NOTE: Either have pages for listing or have infinite scroll
//NOTE: Upgraded users can have more listings with special features such as infite scroll, and filter
'use server';
import React from 'react';
import { getTranslations } from 'next-intl/server';

import { Link, Divider, DashboardListingCard } from '@/components';
import type { UsersTypes, ListingData, dashboardViewCounterDisplayType } from '@/types';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { refreshUserSession } from '@/lib/actions/refreshServerSession';
import { ViewCountDisplay } from './viewCountDisplay';
import { DashboardListing } from './dashboardListing';

export default async function jobListing() {
  const t = await getTranslations('dashboard');
  const session = await getServerUserSession();
  let sessionId;
  if (session) {
    sessionId = session.user.id;
  } else {
    const session = await refreshUserSession();
    sessionId = session.user.id;
  }

  const response = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/dashboard/jobListing/${sessionId}`: process.env.NEXT_PRIVATE_URL + `/api/dashboard/jobListing/${sessionId}`,
  );
  const { fetchedUserData, fetchedJobPostData, viewCount } = await response.json();
  const currentUser = fetchedUserData as UsersTypes;
  const jobListing = fetchedJobPostData as ListingData[];
  const totalViewCount = viewCount as dashboardViewCounterDisplayType;
  // console.log(jobListing);
  // console.log(totalViewCount);

  // console.log(ownerId);

  const promotedListings: ListingData[] = jobListing.filter((listing) => listing.promoted === true);
  // console.log(currentUser);
  // console.log(currentUserJobListing);
  // console.log(promotedListings);

  return (
    <section className='flex w-full flex-col gap-y-8 bg-white px-5 py-4'>
      <div className='flex flex-col gap-2'>
        <h1>
          {t('jobListing.welcomeBack')} {currentUser.user_name}
        </h1>
        <div className='flex w-fit gap-2 rounded border border-gray-300 p-1 px-2'>
          <div>
            {jobListing.length}
            <span className='font-medium'>
              /{currentUser.availableJobListing} {t('jobListing.jobListing')}{' '}
            </span>
          </div>
          <hr className='h-auto w-px border bg-gray-300' />
          <div>
            {promotedListings.length}
            <span className='font-medium'>
              /{currentUser.availablePromotion} {t('jobListing.promotion')}
            </span>
          </div>
        </div>
      </div>
      <ViewCountDisplay totalViewCount={totalViewCount} />
      <div>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold'>{t('jobListing.jobListing')}</p>
            <p>{t('jobListing.subText')}</p>
          </div>
          <Link
            href='/annonce/publier'
            className='flex h-fit items-center justify-center rounded-lg bg-brand-primary text-center text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          >
            <button type='button' className='whitespace-nowrap px-4 py-2 text-sm'>
              {t('button.postAJob')}
            </button>
          </Link>
        </div>
        <Divider />
        <DashboardListing jobPost={jobListing} usedPromotion={promotedListings.length} />
      </div>
    </section>
  );
}
