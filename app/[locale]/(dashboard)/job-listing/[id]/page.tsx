import React from 'react';
import { getCurrentUser, getCurrentUserJobListing } from '@/lib/actions';
import type { UsersTypes, ListingData } from '@/types';

const page = async ({ params }: { params: { id: Number } }) => {
  // console.log(params.id);
  const ownerId = params.id;
  const currentUser: UsersTypes = await getCurrentUser({ ownerId });
  const currentUserJobListing: ListingData[] = await getCurrentUserJobListing({ ownerId });
  const promotedListings: ListingData[] = currentUserJobListing.filter((listing) => listing.promoted === true);
  // console.log(currentUser);
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
};

export default page;
