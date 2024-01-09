import React, { FC, RefObject } from 'react';
import { Link, Divider, SignoutButton } from '..';
import type { TranslationProps, UsersTypes } from '@/types';
import { RiFileList3Line, RiHomeSmileLine, RiGroupLine, RiMailLine, RiLifebuoyLine, RiSettings3Line, RiLogoutBoxLine } from 'react-icons/ri';

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
      className='absolute top-14 right-0 w-80 min-w-min max-w-fit py-5 justify-self-center border border-gray-300 rounded-md bg-brand-lightbg whitespace-nowrap'
      id='navbar-menu'
    >
      <p className='flex gap-5 items-center justify-between px-5 py-2 text-base font-medium whitespace-nowrap'>
        {userData.firstname} {userData.lastname}
        {/* <Link href={`/profile/${userData.id}`} className=' block text-brand-primary rounded ' onClick={toggleMenu}>
          {t('sidebar.viewProfile')}
        </Link> */}
      </p>
      <Divider />
      <ul className='text-base font-medium flex flex-col gap-2 rounded-lg list-none'>
        <li className=''>
          <Link href={`/dashboard/job-listing`} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiFileList3Line size={24} />
            {t('sidebar.viewJobListing')}
          </Link>
        </li>
        <li className=''>
          <Link href={`/dashboard/company`} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiHomeSmileLine size={24} />
            {t('sidebar.editCompanyProfile')}
          </Link>
        </li>
        {/* <li className=''>
          <Link href={`profile/${userData.id}`} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiGroupLine size={24} />
            {t('sidebar.team')}
          </Link>
        </li> */}
      </ul>
      <Divider />
      <ul className='text-base font-medium flex flex-col gap-2 rounded-lg list-none'>
        {/* <li className=''>
          <Link href={`profile/${userData.id}`} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiMailLine size={24} />
            {t('sidebar.inbox')}
          </Link>
        </li> */}
        {/* <li className=''>
          <Link href={`profile/${userData.id}`} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiLifebuoyLine size={24} />
            {t('sidebar.support')}
          </Link>
        </li> */}
        <li className=''>
          <Link href={`/dashboard/settings/info`} className='px-5 py-2 flex items-center gap-2 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            <RiSettings3Line size={24} />
            {t('sidebar.settings')}
          </Link>
        </li>
        <li>
          <SignoutButton />
        </li>
      </ul>
    </div>
  );
};
