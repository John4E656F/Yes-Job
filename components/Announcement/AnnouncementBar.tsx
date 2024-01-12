'use client';
import React from 'react';
import { Link } from '../Link/Link';
import { useTranslations } from 'next-intl';

export const AnnouncementBar = () => {
  const t = useTranslations('app');

  return (
    <div role='alert' aria-live='assertive' className='px-4 py-1 bg-brand-accent text-brand-black-100'>
      <div className='flex container justify-center gap-5 items-center '>
        <p>{t('announcement.release')}</p>
        <div className='flex gap-2'>
          <Link href='/signup' className='text-brand-primary font-bold'>
            {t('announcement.releaseLinkRegister')}
          </Link>
          <p>{t('announcement.or')}</p>
          <Link href='/annonce' className='text-brand-primary font-bold'>
            {t('announcement.releaseLinkJobPost')}
          </Link>
        </div>
      </div>
    </div>
  );
};
