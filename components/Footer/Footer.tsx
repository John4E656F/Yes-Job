import React from 'react';
import Link from 'next/link';
import { Logo } from '..';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('app');
  return (
    <footer className='w-full flex flex-col items-center '>
      <div className='container flex flex-col md:flex-row items-center justify-between text-sm gap-4 pt-16 pb-12'>
        <div className='flex flex-col items-center md:items-start max-w-xs'>
          <Link href='/' className='' aria-label='YesJob Footer Logo'>
            <Logo width={80} height={80} />
          </Link>
          <p className='text-sm'>{t('footer.text')}</p>
        </div>
        <div className='flex flex-wrap gap-8'>
          <div className='flex flex-col flex-1 items-start'>
            <h6 className='text-lg'>Yes job</h6>
            <Link href='/contact' className='font-semibold text-blue-600'>
              Contact
            </Link>
          </div>
          <div className='flex flex-col flex-1 items-start whitespace-nowrap'>
            <h6 className='text-lg'>{t('footer.applicants')}</h6>
            <Link href='/' className='font-semibold text-blue-600'>
              {t('footer.jobOffers')}
            </Link>
          </div>
          <div className='flex flex-col flex-1 items-start whitespace-nowrap	'>
            <h6 className='text-lg'>{t('footer.employers')}</h6>
            <Link href='/annonce' className='font-semibold text-blue-600'>
              {t('cta.publish')}
            </Link>
            <Link href='/connecter' className='font-semibold text-blue-600'>
              {t('footer.consult')}
            </Link>
            <Link href='/pricing' className='font-semibold text-blue-600'>
              Pricing
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full text-center justify-center py-10 gap-3.5 '>
        <div className='flex gap-4 justify-center'>
          <Link href='/terms' className='text-xs font-light '>
            {t('footer.terms')}
          </Link>
          <Link href='/privacy' className='text-xs font-light'>
            {t('footer.policy')}
          </Link>
          {/* <Link href='/cookies' className='text-xs font-light'>
            Cookies
          </Link> */}
        </div>
        <div>
          <p>
            {t('footer.based')}
            <span className='text-red-700'>{t('footer.brussels')}</span>
          </p>
          <p>© 2023 Yes Job. {t('footer.right')}</p>
        </div>
      </div>
    </footer>
  );
};
