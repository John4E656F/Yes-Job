//NOTE: Have a filter function to filter expired, promoted, and draft listings
//NOTE: Either have pages for listing or have infinite scroll
//NOTE: Upgraded users can have more listings with special features such as infite scroll, and filter
'use server';
import React from 'react';
import { Link, Divider, DashboardListingCard } from '@/components';

import type { UsersTypes, ListingData, dashboardViewCounterDisplayType } from '@/types';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { refreshUserSession } from '@/lib/actions/refreshServerSession';
import { ViewCountDisplay } from './viewCountDisplay';
import { DashboardListing } from './dashboardListing';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

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
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'
      ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/dashboard/jobListing/${sessionId}`
      : process.env.NEXT_PRIVATE_URL + `/api/dashboard/jobListing/${sessionId}`,
  );

  // const fetchUserData = await fetch(
  //   process.env.NEXT_PRIVATE_PRODUCTION === 'true'
  //     ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/user/${sessionId}`
  //     : process.env.NEXT_PRIVATE_URL + `/api/user/${sessionId}`,
  // );
  // const { fetchedUserData, fetchedUserDataError } = await fetchUserData.json();
  // if (fetchedUserDataError) {
  //   redirect('/');
  // } else {
  //   console.log(fetchedUserData);
  //   const fetchCompanyData = await fetch(
  //     process.env.NEXT_PRIVATE_PRODUCTION === 'true'
  //       ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/company/${fetchedUserData.id}`
  //       : process.env.NEXT_PRIVATE_URL + `/api/company/${fetchedUserData.id}`,
  //   );

  //   const { fetchedCompanyData, fetchedCompanyError } = await fetchCompanyData.json();
  //   console.log(fetchedCompanyData);

  //   const fetchJobListingData = await fetch(
  //     process.env.NEXT_PRIVATE_PRODUCTION === 'true'
  //       ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/jobPost/${fetchedCompanyData.id}`
  //       : process.env.NEXT_PRIVATE_URL + `/api/jobPost/${fetchedCompanyData.id}`,
  //   );
  //   const { fetchedJobPostData, fetchedJobPostError } = await fetchJobListingData.json();
  //   console.log(fetchedJobPostData);

  // }
  const { fetchedUserData, fetchedJobPostData, viewCount } = await response.json();
  const currentUser = fetchedUserData as UsersTypes;
  const jobListing = fetchedJobPostData as ListingData[];
  const totalViewCount = viewCount as dashboardViewCounterDisplayType;
  console.log(currentUser);

  console.log(jobListing);
  console.log(totalViewCount);
  console.log(totalViewCount);

  // console.log(ownerId);
  let promotedListings: ListingData[] = [];
  if (jobListing) {
    promotedListings = jobListing.filter((listing) => listing.promoted === true);
  }

  // console.log(currentUser);
  // console.log(currentUserJobListing);
  // console.log(promotedListings);

  return (
    <section className='w-full bg-white flex flex-col py-4 px-5 gap-y-8'>
      <div className='flex flex-col gap-2'>
        <h1>
          {t('jobListing.welcomeBack')} {currentUser.contactName}
        </h1>
        <div className='flex p-1 px-2 gap-2 w-fit rounded border border-gray-300'>
          <div>
            {jobListing ? jobListing.length : 0}
            <span className='font-medium'>
              /{currentUser.availableJobListing} {t('jobListing.jobListing')}{' '}
            </span>
          </div>
          <hr className='w-px h-auto border bg-gray-300' />
          <div>
            {jobListing ? promotedListings.length : 0}
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
            href='/publier'
            className='flex items-center justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          >
            <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
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
