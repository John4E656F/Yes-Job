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

export default async function jobListing() {
  const t = await getTranslations('app');
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
  const { fetchedUserData, fetchedJobPostData, viewCount } = await response.json();
  const currentUser = fetchedUserData as UsersTypes;
  const jobListing = fetchedJobPostData as ListingData[];
  const totalViewCount = viewCount as dashboardViewCounterDisplayType;
  // console.log(jobListing);
  // console.log(totalViewCount);

  // console.log(ownerId);

  // const currentUserJobListing: ListingData[] = await getCurrentUserJobListing({ ownerId });
  const promotedListings: ListingData[] = jobListing.filter((listing) => listing.promoted === true);
  // console.log(currentUser);
  // console.log(currentUserJobListing);
  // console.log(promotedListings);

  return (
    <section className='w-full bg-white flex flex-col py-4 px-5 gap-y-8'>
      <div className='flex flex-col gap-2'>
        <h1>Welcome back, {currentUser.user_name}</h1>
        <div className='flex p-1 px-2 gap-2 w-fit rounded border border-gray-300'>
          <div>
            {jobListing.length}
            <span className='font-medium'>/{currentUser.availableJobListing} Job Listing </span>
          </div>
          <hr className='w-px h-auto border bg-gray-300' />
          <div>
            {promotedListings.length}
            <span className='font-medium'>/{currentUser.availablePromotion} Promotion</span>
          </div>
        </div>
      </div>
      <ViewCountDisplay totalViewCount={totalViewCount} />
      <div>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold'>Job Listings</p>
            <p>Manage your live and draft job listings here.</p>
          </div>
          <Link
            href='/annonce/publier'
            className='flex items-center justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          >
            <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
              Post a job
            </button>
          </Link>
        </div>
        <Divider />
        <DashboardListing jobPost={jobListing} />
      </div>
    </section>
  );
}
