'use server';
import React from 'react';
import { Link, Divider, DashboardListingCard } from '@/components';
import { RiFileList3Line } from 'react-icons/ri';
import type { UsersTypes, ListingData, dashboardViewCounterDisplayType } from '@/types';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { refreshUserSession } from '@/lib/actions/refreshServerSession';
import { ViewCountDisplay } from './viewCountDisplay';
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
            className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <button type='button' className='px-4 h-11 text-sm'>
              Post a job
            </button>
          </Link>
        </div>
        <Divider />
        {fetchedJobPostData ? (
          <div className='flex flex-col gap-4'>
            {jobListing.map((jobPost) => (
              <DashboardListingCard key={jobPost.id} jobPost={jobPost} />
            ))}
            <div className='flex flex-col gap-2 p-2 items-center border border-brand-lightbg rounded'>
              <span className='p-3 border border-brand-gray rounded-md'>
                <RiFileList3Line size={28} />
              </span>
              <div className='flex flex-col gap- text-center'>
                <p className='text-sm font-medium'>Need to list more job ?</p>
                <p className='text-sm'>Upgrade your account and get to list more job vacancy</p>
              </div>
              <Link
                href='/annonce/publier'
                className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
              >
                <button type='button' className='px-4 h-11 text-sm'>
                  Upgrade
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3 p-5 items-center border border-brand-lightbg rounded'>
            <span className='p-3 border border-brand-gray rounded-md'>
              <RiFileList3Line size={28} />
            </span>
            <div className='flex flex-col gap- text-center'>
              <p className='text-sm font-medium'>Post your first job vacancy!</p>
              <p className='text-sm'>Your first 2 job listing are free</p>
            </div>
            <Link
              href='/annonce/publier'
              className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <button type='button' className='px-4 h-11 text-sm'>
                Post a job
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
