import React from 'react';
import { SearchBar, ListingCard } from '../';

export const Listing = () => {
  return (
    <section className='w-full flex justify-center bg-brand-lightbg'>
      <div className='flex flex-col container py-4 md:py-16 gap-16'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-5'>
            <h5 className='text-base font-medium'>575 job offers</h5>
            <h2 className='text-4xl font-semibold'>Explorer des milliers d'offres d'emploi</h2>
          </div>
          <SearchBar />
        </div>
        <div>
          <ListingCard />
        </div>
      </div>
    </section>
  );
};
