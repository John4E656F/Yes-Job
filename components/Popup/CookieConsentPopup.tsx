'use client';
import React, { useState, useEffect } from 'react';
import { Link } from '../Link/Link';
import { getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';

export const CookieConsentPopup = () => {
  const t = useTranslations('policies');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookieConsent');
    if (consent !== 'given') {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'given');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-brand-gray p-4 shadow-md'>
      <div className='flex container justify-between items-center '>
        <div>
          <p>{t('cookies.what')} </p>
          <p>{t('cookies.agree')}</p>
        </div>
        <div className='flex flex-col'>
          <button className='bg-blue-500 text-white px-3 py-2 rounded mt-2' onClick={handleAccept}>
            {t('cookies.accept')}
          </button>
          <Link href='/privacy-policy' className='text-blue-500 whitespace-nowrap'>
            {t('cookies.privacy')}
          </Link>
        </div>
      </div>
    </div>
  );
};
