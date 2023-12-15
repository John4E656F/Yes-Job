// 'use client';
import React from 'react';
import { Divider, Link, Button } from '../';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { payment } from '@/lib/actions/';
import { CompanyTypes, UsersTypes } from '@/types';

interface PricingCardProps {
  title: string;
  price: number | string;
  subTitle: string;
  details: string[];
  buttonText: string;
  pLink?: string;
  userData?: UsersTypes;
  companyData?: CompanyTypes;
  subscription?: boolean;
  companyBoost?: boolean;
  paymentType?: string;
}
export const PricingCard = async ({
  title,
  price,
  subTitle,
  details,
  buttonText,
  pLink,
  userData,
  companyData,
  subscription,
  companyBoost,
  paymentType,
}: PricingCardProps) => {
  let paymentLink;
  if (userData && pLink) {
    paymentLink = await payment({ pLink: pLink, userData: userData });
  }
  // console.log('paymentLink', paymentType, paymentLink);
  // console.log(companyData);
  // console.log(userData);

  return (
    <div className='border rounded w-4/5 bg-brand-lightbg flex flex-col justify-center items-center '>
      <div className='flex flex-1 flex-col text-center px-8 pt-8'>
        <p>{title}</p>
        <h2 className='px-4 py-2 m-2'>{price}</h2>
        <p>{subTitle}</p>
      </div>
      <ul className='flex flex-col gap-3 p-8 basis-full text-left list-none'>
        {details.map((detail, index) => (
          <li key={index} className='flex items-start gap-2'>
            <div>
              <AiOutlineCheckCircle size={20} className='text-brand-secondary' />
            </div>
            <p>{detail}</p>
          </li>
        ))}
      </ul>
      <div className=''>
        {!companyData ? (
          <Link
            href='/dashboard/company'
            className='flex items-center px-2 mb-8 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          >
            <button type='button' className='px-4 py-2  whitespace-nowrap'>
              Finish setting up your company
            </button>
          </Link>
        ) : companyBoost ? (
          <div className='flex items-center px-8 mb-8 justify-center h-fit text-center bg-white rounded '>
            <p className='px-4 py-2 whitespace-nowrap'>{buttonText}</p>
          </div>
        ) : subscription ? (
          <div className='flex flex-col gap-1'>
            <div className='flex items-center px-8  justify-center h-fit text-center bg-white rounded '>
              <p className='px-4 py-2 whitespace-nowrap'>Already subscribe</p>
            </div>
            <Link href='/dashboard/billing' className='mb-2 text-sm text-brand-failed'>
              Unsubscribe
            </Link>
          </div>
        ) : userData && paymentLink ? (
          <Link
            href={paymentLink}
            className='flex items-center px-8 mb-8 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          >
            <button type='button' className='px-4 py-2  whitespace-nowrap'>
              {buttonText}
            </button>
          </Link>
        ) : (
          <Link
            href='/publier'
            className='flex items-center px-8 mb-8 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          >
            <button type='button' className='px-4 py-2 whitespace-nowrap'>
              Publish your first job offer
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
