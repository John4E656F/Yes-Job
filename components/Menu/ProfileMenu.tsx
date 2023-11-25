import React, { FC, RefObject } from 'react';
import { RiFileList3Line, RiHomeSmileLine, RiGroupLine, RiMailLine, RiLifebuoyLine, RiSettings3Line, RiLogoutBoxLine } from 'react-icons/ri';

import { Link, Divider } from '..';
import type { TranslationProps, UsersTypes } from '@/types';

interface ProfileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  userData: UsersTypes;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, t, userData }) => {
  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      className='absolute right-0 top-14 w-80 min-w-min max-w-fit justify-self-center whitespace-nowrap rounded-md border border-gray-300 bg-brand-lightbg py-5'
      id='navbar-menu'
    >
      <p className='flex items-center justify-between gap-5 whitespace-nowrap px-5 py-2 text-base font-medium'>
        {userData.user_name}
        <Link href={`/profile/${userData.id}`} className=' block rounded text-brand-primary ' onClick={toggleMenu}>
          {t('sidebar.viewProfile')}
        </Link>
      </p>
      <Divider />
      <ul className='flex list-none flex-col gap-2 rounded-lg text-base font-medium'>
        <li className=''>
          <Link href={`/dashboard/job-listing`} className='flex items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiFileList3Line size={24} />
            {t('sidebar.viewJobListing')}
          </Link>
        </li>
        <li className=''>
          <Link href={`profile/${userData.id}`} className='flex items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiHomeSmileLine size={24} />
            {t('sidebar.editCompanyProfile')}
          </Link>
        </li>
        <li className=''>
          <Link href={`profile/${userData.id}`} className='flex items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiGroupLine size={24} />
            {t('sidebar.team')}
          </Link>
        </li>
      </ul>
      <Divider />
      <ul className='flex list-none flex-col gap-2 rounded-lg text-base font-medium'>
        <li className=''>
          <Link href={`profile/${userData.id}`} className='flex items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiMailLine size={24} />
            {t('sidebar.inbox')}
          </Link>
        </li>
        <li className=''>
          <Link href={`profile/${userData.id}`} className='flex items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiLifebuoyLine size={24} />
            {t('sidebar.support')}
          </Link>
        </li>
        <li className=''>
          <Link href={`profile/${userData.id}`} className='flex items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiSettings3Line size={24} />
            {t('sidebar.settings')}
          </Link>
        </li>
        <li>
          <form action='/auth/sign-out' method='post'>
            <button className='flex w-full items-center gap-2 px-5 py-2 text-gray-900 hover:bg-blue-200'>
              <RiLogoutBoxLine size={24} />
              {t('sidebar.logout')}
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};
