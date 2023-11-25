import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Logo } from '..';

export const Footer = () => {
  const t = useTranslations('app');
  return (
    <footer className='flex w-full flex-col items-center '>
      <div className='container flex flex-col items-center justify-between gap-4 pb-12 pt-16 text-sm md:flex-row'>
        <div className='flex max-w-xs flex-col items-center md:items-start'>
          <Link href='/' className='' aria-label='YesJob Footer Logo'>
            <Logo width={80} height={80} />
          </Link>
          <p className='text-sm'>{t('footer.text')}</p>
        </div>
        <div className='flex flex-wrap gap-8'>
          <div className='flex flex-1 flex-col items-start'>
            <h6 className='text-lg'>Yes job</h6>
            <Link href='/contact' className='font-semibold text-blue-600'>
              Contact
            </Link>
          </div>
          <div className='flex flex-1 flex-col items-start whitespace-nowrap'>
            <h6 className='text-lg'>{t('footer.applicants')}</h6>
            <Link href='/' className='font-semibold text-blue-600'>
              {t('footer.jobOffers')}
            </Link>
          </div>
          <div className='flex flex-1 flex-col items-start whitespace-nowrap	'>
            <h6 className='text-lg'>{t('footer.employers')}</h6>
            <Link href='/annonce' className='font-semibold text-blue-600'>
              {t('cta.publish')}
            </Link>
            <Link href='/connecter' className='font-semibold text-blue-600'>
              {t('footer.consult')}
            </Link>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col justify-center gap-3.5 py-10 text-center '>
        <div className='flex justify-center gap-4'>
          <Link href='/conditions' className='text-xs font-light '>
            {t('footer.terms')}
          </Link>
          <Link href='/confidentialité' className='text-xs font-light'>
            {t('footer.policy')}
          </Link>
          <Link href='/cookies' className='text-xs font-light'>
            Cookies
          </Link>
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
