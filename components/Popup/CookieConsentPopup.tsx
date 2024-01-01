'use client';
import React from 'react';
import { getCookies, setCookies } from '@/lib/cookieHelper';
import { Button } from '../Button/Button';

export const CookieConsentPopup = () => {
  const consent = getCookies('cookieConsent');
  console.log('consent', consent);

  const handleAccept = () => {
    setCookies('cookieConsent');
  };

  //   if (!consent) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md'>
      <div className='flex flex-col container justify-center py-4 md:py-16 '>
        <p className='text-sm'>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <Button text='Accept All' btnType='button' className='bg-blue-500 text-white px-3 py-2 rounded mt-2' onClick={handleAccept} />
      </div>
    </div>
  );
};
