import React from 'react';
import { Link, Button, PricingCard, BasicPlanCard } from '@/components';
import type { subDataTypes, boostDataTypes, CompanyTypes, UsersTypes } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';

export default async function pricingPage() {
  const t = await getTranslations('app');
  const session = await getServerUserSession();
  let userData: UsersTypes | undefined;
  let companyData: CompanyTypes | undefined;
  let sessionId;

  if (session) {
    sessionId = session.user.id;
    const userResponse = await fetch(
      process.env.NEXT_PRIVATE_PRODUCTION === 'true'
        ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/user/${sessionId}`
        : process.env.NEXT_PRIVATE_URL + `/api/user/${sessionId}`,
    );
    const { fetchedUserData } = await userResponse.json();

    if (fetchedUserData) {
      userData = fetchedUserData;

      const companyResponse = await fetch(
        process.env.NEXT_PRIVATE_PRODUCTION === 'true'
          ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/company/${fetchedUserData.id}`
          : process.env.NEXT_PRIVATE_URL + `/api/company/${fetchedUserData.id}`,
      );
      const { fetchedCompanyData } = await companyResponse.json();
      if (fetchedCompanyData) {
        companyData = fetchedCompanyData;
      }
    }
  }
  // console.log('fetchedCompanyData', fetchedCompanyData);

  const subData: subDataTypes[] = [
    {
      title: t('pricing.standardTitle'),
      price: t('pricing.price', { number: '150' }),
      saves: t('pricing.saves', { number: '180' }),
      details: [
        t('pricing.detailsListing', { number: '5', s: 's' }),
        t('pricing.detailsDashboardBasic'),
        t('pricing.detailsOptimization'),
        t('pricing.detailsBasicSupport'),
        t('pricing.detailsApplication'),
      ],
      buttonText: t('pricing.buttonSubscribe'),
      priceId: 'price_1OMWpzElNHG3WsnfdWTcv2Pk',
      subscription: companyData ? (companyData.subscription === 'Standard plan' ? true : false) : false,
    },
    {
      title: t('pricing.premiumTitle'),
      price: t('pricing.price', { number: '400' }),
      saves: t('pricing.saves', { number: '230' }),
      details: [
        t('pricing.detailsListing', { number: '10', s: 's' }),
        t('pricing.detailsBoostPerMonth', { number: '2' }),
        t('pricing.detailsSpecializeDashboard'),
        t('pricing.detailsOptimization'),
        t('pricing.detailsBasicSupport'),
        t('pricing.detailsApplication'),
      ],
      buttonText: t('pricing.buttonSubscribe'),
      priceId: 'price_1OMWqOElNHG3WsnfyydUmdZZ',
      subscription: companyData ? (companyData.subscription === 'Premium plan' ? true : false) : false,
    },
    {
      title: t('pricing.platinumTitle'),
      price: t('pricing.price', { number: '900' }),
      saves: t('pricing.saves', { number: '310' }),
      details: [
        t('pricing.detailsListing', { number: '15', s: 's' }),
        t('pricing.detailsBoostPerMonth', { number: '5' }),
        t('pricing.detailsSpecializeDashboard'),
        t('pricing.detailsOptimization'),
        t('pricing.detailsBasicSupport'),
        t('pricing.detailsApplication'),
        t('pricing.detailsGetFeatured'),
      ],
      buttonText: t('pricing.buttonSubscribe'),
      priceId: 'price_1OMWqmElNHG3WsnfX1r2vPjI',
      subscription: companyData ? (companyData.subscription === 'Platinum plan' ? true : false) : false,
    },
  ];

  const boostData: boostDataTypes[] = [
    {
      title: t('pricing.boost.title', { number: '1' }),
      price: t('pricing.price', { number: '50' }),
      subText: t('pricing.boost.1subTitle'),
      details: [
        t('pricing.boost.detailsBoost', { number: '1' }),
        t('pricing.boost.detailsSponsored'),
        t('pricing.boost.detailsDistinguish'),
        t('pricing.boost.detailsMoreAppearance'),
      ],
      buttonText: t('pricing.buttonOrderNow'),
      priceId: 'price_1ONKKDElNHG3WsnfWc8KTVfH',
      companyBoost: false,
    },
    {
      title: t('pricing.boost.title', { number: '5' }),
      price: t('pricing.price', { number: '250' }),
      subText: t('pricing.boost.5subTitle'),
      details: [
        t('pricing.boost.detailsBoost', { number: '5' }),
        t('pricing.boost.detailsSponsored'),
        t('pricing.boost.detailsDistinguish'),
        t('pricing.boost.detailsMoreAppearance'),
      ],
      buttonText: t('pricing.buttonOrderNow'),
      priceId: 'price_1ONKJVElNHG3WsnfK5hKYUJq',
      companyBoost: false,
    },
    {
      title: t('pricing.boost.companyBoost'),
      price: t('pricing.price', { number: '500' }),
      subText: t('pricing.boost.companySubTitle'),
      details: [t('pricing.boost.detailsCompanyBanner'), t('pricing.boost.detailsCompanySponsored')],
      buttonText: t('pricing.buttonComingSoon'),
      priceId: 'price_1OMWsTElNHG3WsnfcQNLD4rL',
      companyBoost: true,
    },
  ];

  return (
    <section className='flex flex-col gap-10 container'>
      <div className='flex flex-col items-center gap-8'>
        <div className='text-center'>
          <p>{t('pricing.headerTitle')}</p>
          <h1>{t('pricing.headerSubTitle')}</h1>
          <p>{t('pricing.headerSubTitle2')}</p>
        </div>
        <Link
          href={`/contact`}
          className='flex items-center w-36 justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
        >
          <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
            {t('pricing.headerCTA')}
          </button>
        </Link>
      </div>
      <div className='flex flex-col gap-16 '>
        <div className=' flex flex-col md:flex-row items-center justify-center gap-8'>
          <PricingCard
            title={t('pricing.free.title')}
            price={t('pricing.free.price')}
            subTitle={t('pricing.free.subTitle')}
            details={[
              t('pricing.detailsListing', { number: '1', s: '' }),
              t('pricing.detailsDashboardBasic'),
              t('pricing.detailsOptimization'),
              t('pricing.detailsBasicSupport'),
              t('pricing.detailsApplication'),
            ]}
            buttonText={t('pricing.buttonFirstListing')}
          />
          <BasicPlanCard userData={userData} companyData={companyData} />
        </div>
        {/* <div className='flex flex-col gap-2 text-center'>
          <h3>{t('pricing.headerSubscriptionTitle')}</h3>
          <p>{t('pricing.headerSubscriptionSubTitle')}</p>
          <div className='flex gap-8 mt-5'>
            {subData.map((data, index) => (
              <PricingCard
                key={index}
                title={data.title}
                subTitle={data.saves}
                price={data.price}
                details={data.details}
                buttonText={data.buttonText}
                priceId={data.priceId}
                userData={fetchedUserData}
                companyData={fetchedCompanyData}
                subscription={data.subscription}
                paymentType='subscription'
              />
            ))}
          </div>
        </div> */}
        <div className='flex flex-col gap-2  text-center'>
          <h3>{t('pricing.headerExtraTitle')}</h3>
          <p>{t('pricing.headerExtraSubTitle')}</p>
          <div className='flex gap-8 mt-5 flex-col md:flex-row items-center '>
            {boostData.map((data, index) => (
              <PricingCard
                key={index}
                title={data.title}
                subTitle={data.subText}
                price={data.price}
                details={data.details}
                buttonText={data.buttonText}
                priceId={data.priceId}
                userData={userData}
                companyData={companyData}
                companyBoost={data.companyBoost}
                paymentType='payment'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
