'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BsPinAngle, BsBullseye, BsFacebook, BsGoogle } from 'react-icons/bs';

const AnnoncePage = () => {
  const t = useTranslations('app');
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center  py-4 md:py-16 '>
        <div className=' w-auto flex flex-col gap-12 text-center'>
          <h1 className='text-4xl font-semibold'>{t('ads.title')}</h1>
          <h3 className='text-2xl'>{t('ads.subTitle')}</h3>
          <div className='flex md:justify-center'>
            <ul className='flex flex-col text-lg text-left gap-3'>
              <li className='flex items-center gap-2'>
                <div>
                  <BsPinAngle size={24} />
                </div>
                <p>{t('ads.li')}</p>
              </li>
              <li className='flex items-center gap-2  '>
                <div>
                  <BsBullseye size={24} />
                </div>
                <p>{t('ads.li1')}</p>
              </li>
              <li className='flex items-center gap-2  '>
                <div>
                  <BsFacebook size={24} />
                </div>
                <p>{t('ads.li2')}</p>
              </li>
              <li className='flex items-center gap-2 '>
                <div>
                  <BsGoogle size={24} />
                </div>
                <p>{t('ads.li3')}</p>
              </li>
              <li className='flex items-center gap-2'>
                <div>
                  <BsGoogle size={24} />
                </div>
                <p>{t('ads.li4')}</p>
              </li>
            </ul>
          </div>
          <Link href='/annonce/publier' className='flex justify-center'>
            <button
              type='button'
              className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
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
