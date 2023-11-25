'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BsPinAngle, BsBullseye, BsFacebook, BsGoogle } from 'react-icons/bs';

const AnnoncePage = () => {
  const t = useTranslations('app');
  return (
    <header className='flex w-full justify-center'>
      <div className='container flex flex-col justify-center  py-4 md:py-16 '>
        <div className=' flex w-auto flex-col gap-12 text-center'>
          <h1 className='text-4xl font-semibold'>{t('ads.title')}</h1>
          <h3 className='text-2xl'>{t('ads.subTitle')}</h3>
          <div className='flex md:justify-center'>
            <ul className='flex flex-col gap-3 text-left text-lg'>
              <li className='flex items-center gap-2'>
                <div>
                  <BsPinAngle size={24} className='text-brand-primary' />
                </div>
                <p>{t('ads.li')}</p>
              </li>
              <li className='flex items-center gap-2  '>
                <div>
                  <BsBullseye size={24} className='text-brand-primary' />
                </div>
                <p>{t('ads.li1')}</p>
              </li>
              <li className='flex items-center gap-2  '>
                <div>
                  <BsFacebook size={24} className='text-brand-primary' />
                </div>
                <p>{t('ads.li2')}</p>
              </li>
              <li className='flex items-center gap-2 '>
                <div>
                  <BsGoogle size={24} className='text-brand-primary' />
                </div>
                <p>{t('ads.li3')}</p>
              </li>
              <li className='flex items-center gap-2'>
                <div>
                  <BsGoogle size={24} className='text-brand-primary' />
                </div>
                <p>{t('ads.li4')}</p>
              </li>
            </ul>
          </div>
          <Link href='/annonce/publier' className='flex justify-center'>
            <button
              type='button'
              className='h-11 w-full items-center justify-center rounded-lg bg-brand-primary px-4 text-sm text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200 md:block md:w-auto  '
            >
              {t('cta.add')}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default AnnoncePage;
