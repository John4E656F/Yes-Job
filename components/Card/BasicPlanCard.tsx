'use client';
import React, { useState } from 'react';
import { Button, Link } from '..';

type PriceDetail = {
  price: number;
  buttonText: string;
  totalPrice: number;
};

const priceDetails: PriceDetail[] = [
  {
    price: 69,
    buttonText: '1 post',
    totalPrice: 49,
  },
  {
    price: 66,
    buttonText: '5 posts',
    totalPrice: 330,
  },
  {
    price: 63,
    buttonText: '10 posts',
    totalPrice: 630,
  },
];

export const BasicPlanCard: React.FC = () => {
  const [currentPriceDetail, setCurrentPriceDetail] = useState<PriceDetail>(priceDetails[0]);

  const handlePriceChange = (priceDetail: PriceDetail) => {
    setCurrentPriceDetail(priceDetail);
  };

  return (
    <div className='border rounded w-4/5 bg-brand-lightbg flex flex-col justify-center items-center '>
      <div className='text-center px-8 pt-8'>
        <p>Basic plan</p>
        <div className='flex gap-2'>
          {priceDetails.map((detail, index) => (
            <Button
              key={index}
              className={`flex items-center justify-center text-center ${
                currentPriceDetail.price === detail.price ? 'bg-blue-600 text-white' : 'bg-brand-primary text-white'
              } rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 px-4 py-2 m-2`}
              text={detail.buttonText}
              btnType='button'
              onClick={() => handlePriceChange(detail)}
            />
          ))}
        </div>
        <h2>€ {currentPriceDetail.price} /job post</h2>
        <p>{`One-time payment: € ${currentPriceDetail.totalPrice}`}</p>
      </div>
      <hr className='my-4 w-4/5 h-px border-t-0 bg-gray-500 ' />
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
