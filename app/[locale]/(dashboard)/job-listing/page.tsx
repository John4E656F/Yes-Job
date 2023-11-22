'use server';
import React from 'react';
import { getCurrentUserJobListing } from '@/lib/actions';
import type { UsersTypes, ListingData } from '@/types';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';

export default async function jobListing() {
  const session = await getServerUserSession();

  const ownerId = session!.user.id;
  const response = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'
      ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/user/${ownerId}`
      : process.env.NEXT_PRIVATE_URL + `/api/user/${ownerId}`,
  );
  const currentUser: UsersTypes = await response.json();
  const currentUserJobListing: ListingData[] = await getCurrentUserJobListing({ ownerId });
  const promotedListings: ListingData[] = currentUserJobListing.filter((listing) => listing.promoted === true);
  console.log(currentUser);
  // console.log(currentUserJobListing);
  // console.log(promotedListings);

  return (
    <section className='w-full bg-white flex flex-col py-4 px-5 gap-4'>
      <div className='flex flex-col gap-2'>
        <h1>Welcome back, {currentUser.user_name}</h1>
        <div className='flex p-1 px-2 gap-2 w-fit rounded border border-gray-300'>
          <div>
            {currentUserJobListing.length}
            <span className='font-semibold'>/{currentUser.availableJobListing} Job Listing </span>
          </div>
          <hr className='w-px h-auto border bg-gray-300' />
          <div>
            {promotedListings.length}
            <span className='font-semibold'>/{currentUser.availablePromotion} Promotion</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Views 24 hours</p>
          <p></p>
        </div>
      </div>
    </section>
  );
}
