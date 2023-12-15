'use client';
import React, { useState } from 'react';
import { Button, Link } from '..';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { payment } from '@/lib/actions/';
import { CompanyTypes, UsersTypes } from '@/types';

interface BasicPlaProps {
  userData: UsersTypes;
  companyData: CompanyTypes;
}
type PriceDetail = {
  price: number;
  buttonText: string;
  totalPrice: number;
  priceId: string;
  pLink: string;
};

const priceDetails: PriceDetail[] = [
  {
    price: 69,
    buttonText: '1 post',
    totalPrice: 69,
    priceId: 'price_1OMWnpElNHG3WsnfgUBuZZPT',
    pLink: 'plink_1ONaNLElNHG3WsnftYS8wNyr',
  },
  {
    price: 66,
    buttonText: '5 posts',
    totalPrice: 330,
    priceId: 'price_1OMWoYElNHG3WsnfBgKEyn8T',
    pLink: 'plink_1ONaXrElNHG3WsnfpURy8fuS',
  },
  {
    price: 63,
    buttonText: '10 posts',
    totalPrice: 630,
    priceId: 'price_1OMWp3ElNHG3WsnfCGKwwM5Y',
    pLink: 'plink_1ONaYhElNHG3WsnfsPeWO6T1',
  },
];

export const BasicPlanCard = ({ userData, companyData }: BasicPlaProps) => {
  const [currentPriceDetail, setCurrentPriceDetail] = useState<PriceDetail>(priceDetails[0]);

  const handlePriceChange = (priceDetail: PriceDetail) => {
    setCurrentPriceDetail(priceDetail);
  };

  const onClick = async () => {
    const paymentLink = await payment({
      priceId: currentPriceDetail.priceId,
      userData: userData!,
      companyData: companyData,
      paymentType: 'payment',
    });

    if (paymentLink) {
      window.location.href = paymentLink;
      // window.open(paymentLink, '_blank');
    }
    console.log('paymentlink', paymentLink);
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
                currentPriceDetail.price === detail.price ? 'bg-blue-600 text-white' : 'border bg-white hover:bg-gray-100'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 px-4 py-2 m-2`}
              text={detail.buttonText}
              btnType='button'
              onClick={() => handlePriceChange(detail)}
            />
          ))}
        </div>
        <h2>€ {currentPriceDetail.price} /job post</h2>
        <p>{`One-time payment: € ${currentPriceDetail.totalPrice}`}</p>
      </div>
      <ul className='flex flex-col gap-3 p-8 basis-full text-left list-none'>
        <li className='flex items-start gap-2'>
          <div>
            <AiOutlineCheckCircle size={20} className='text-brand-secondary' />
          </div>
          <p>1 job listing</p>
        </li>
        <li className='flex items-start gap-2'>
          <div>
            <AiOutlineCheckCircle size={20} className='text-brand-secondary' />
          </div>
          <p> Dashboard</p>
        </li>
        <li className='flex items-start gap-2'>
          <div>
            <AiOutlineCheckCircle size={20} className='text-brand-secondary' />
          </div>
          <p> Offer optimization</p>
        </li>
        <li className='flex items-start gap-2'>
          <div>
            <AiOutlineCheckCircle size={20} className='text-brand-secondary' />
          </div>
          <p> Basic chat and email support</p>
        </li>
        <li className='flex items-start gap-2'>
          <div>
            <AiOutlineCheckCircle size={20} className='text-brand-secondary' />
          </div>
          <p> Job application sent directly to your email</p>
        </li>
      </ul>
      {userData ? (
        <Button
          onClick={onClick}
          btnType='button'
          text='Publish your first job offer'
          className='flex items-center px-8 py-2 mb-8 justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
        />
      ) : (
        <Link
          href='/auth/login'
          className='flex items-center px-8 mb-8 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
        >
          <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
            Login
          </button>
        </Link>
      )}
    </div>
  );
};
