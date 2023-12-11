import React from 'react';
import { Divider, Link } from '../';

interface PricingCardProps {
  title: string;
  price: number | string;
  subTitle: string;
  details: string[];
  buttonText: string;
}
export const PricingCard = ({ title, price, subTitle, details, buttonText }: PricingCardProps) => {
  return (
    <div className='border rounded w-4/5 bg-brand-lightbg flex flex-col justify-center items-center '>
      <div className='flex flex-1 flex-col text-center px-8 pt-8'>
        <p>{title}</p>
        <h2>{price}</h2>
        <p>{subTitle}</p>
      </div>
      <hr className='my-4 w-4/5 h-1 border-t-0 bg-gray-500 ' />
      <ul className='p-8 basis-full text-left list-none'>
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <div className=''>
        <Link
          href={`/publier`}
          className='flex items-center px-8 mb-8 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
        >
          <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};
