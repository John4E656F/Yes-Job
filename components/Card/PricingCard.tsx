import React from 'react';
import { Link } from '../';

export const PricingCard = () => {
  return (
    <div className='border rounded w-4/5 bg-brand-lightbg flex flex-col justify-center items-center '>
      <div className='text-center px-8 pt-8'>
        <p>Free plan</p>
        <h2>Free</h2>
        <p>Your first job listing is free</p>
      </div>
      <ul className='p-8'>
        <li>1 job listing</li>
        <li>Dashboard</li>
        <li>Offer optimization</li>
        <li>Basic chat and email support</li>
        <li>Job application sent directly to your email</li>
      </ul>
      <Link
        href={`/publier`}
        className='flex items-center px-8 mb-8 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
      >
        <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
          Publish your first job offer
        </button>
      </Link>
    </div>
  );
};
