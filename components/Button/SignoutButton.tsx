import React from 'react';
import { useRouter } from 'next/navigation';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useTranslations } from 'next-intl';
import { signout } from '@/lib/actions';

export const SignoutButton = () => {
  const t = useTranslations('app');

  const onSignout = async () => {
    try {
      await signout().then(() => {
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Error during signout:', error);
    }
  };

  return (
    <button onClick={onSignout} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200 w-full'>
      <RiLogoutBoxLine size={24} />
      {t('sidebar.logout')}
    </button>
  );
};
