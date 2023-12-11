import React from 'react';
import { Link, Button, PricingCard, BasicPlanCard } from '@/components';

const pricingPage = () => {
  return (
    <section className='flex flex-col gap-10 container'>
      <div className='flex flex-col items-center gap-8'>
        <div className='text-center'>
          <p>Pricing</p>
          <h1>Flexible Plans and Pricing</h1>
          <p>Simple, transpararent pricing that grows with you.</p>
        </div>
        <Link
          href={`/contact`}
          className='flex items-center w-36 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
        >
          <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
            Chat to sales
          </button>
        </Link>
      </div>
      <div className=' flex justify-center gap-8'>
        <PricingCard />
        <BasicPlanCard />
      </div>
    </section>
  );
};

export default pricingPage;
