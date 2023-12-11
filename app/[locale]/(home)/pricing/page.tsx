import React from 'react';
import { Link, Button, PricingCard, BasicPlanCard } from '@/components';
import { subData, boostData } from './pricingData';

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
      <div className='flex flex-col gap-16'>
        <div className=' flex justify-center gap-8'>
          <PricingCard
            title='Free plan'
            price='Free'
            subTitle='Your first job listing is free'
            details={[
              '1 job listing',
              'Dashboard',
              'Offer optimization',
              'Basic chat and email support',
              'Job application sent directly to your email',
            ]}
            buttonText='Publish your first job offer'
          />
          <BasicPlanCard />
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h3>Monthly Subscription</h3>
          <p>Additional job listing will cost €59 per job post.</p>
          <div className='flex gap-8 mt-5'>
            {subData.map((data, index) => (
              <PricingCard
                key={index}
                title={data.title}
                subTitle={`You saves ${data.saves}`}
                price={data.price}
                details={data.details}
                buttonText={data.buttonText}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h3>Extra options</h3>
          <div className='flex gap-8 mt-5'>
            {boostData.map((data, index) => (
              <PricingCard
                key={index}
                title={data.title}
                subTitle={data.subText}
                price={data.price}
                details={data.details}
                buttonText={data.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default pricingPage;
