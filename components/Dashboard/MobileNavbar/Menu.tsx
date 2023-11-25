'use client';
import React, { FC, RefObject } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HiXMark, HiMiniLanguage, HiUser } from 'react-icons/hi2';

import { Image, Button, Logo, Link, SidebarList, LocaleSwitcher, ProfileMenu } from '@/components';
import type { TranslationProps } from '@/types';
import { useToggleMenu } from '@/hooks';
import type { UsersTypes } from '@/types';

interface MobileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  userData: UsersTypes;
  currentLocale: string;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, userData, t, currentLocale }) => {
  const { menuRef: localeModalRef, isMenuOpen: isLocaleModalOpen, toggleMenu: toggleLocaleModal } = useToggleMenu();

  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      className='absolute right-0 top-1 flex w-full flex-col gap-5 justify-self-center rounded-md border border-gray-300 bg-brand-lightbg p-5 md:hidden'
      id='navbar-menu'
    >
      <div className='flex items-center justify-between'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <Link
              href='/'
              className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary p-2 text-sm text-white hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-gray-200'
              aria-current='home'
            >
              <FaArrowLeft size={40} />
            </Link>
            <Button
              text={<HiMiniLanguage className='text-xl text-gray-400 hover:text-brand-hover' size={30} />}
              btnType='button'
              onClick={toggleLocaleModal}
            />
          </div>
          <Button
            text={<HiXMark size={40} />}
            btnType='button'
            onClick={toggleMenu}
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden'
          />
        </div>
      </div>
      <SidebarList t={t} companyName={userData.user_name} />
      <div className='mt-auto flex gap-2 p-2'>
        {userData.user_logo ? (
          <Button
            text={<Image src={userData.user_logo} alt='user avatar' width={40} height={40} className='rounded-full p-1 ring-2 ring-gray-300' />}
            btnType='button'
          />
        ) : (
          <HiUser size={40} className='rounded-full p-1 text-gray-400 ring-2 ring-gray-300' aria-label='user avatar' />
        )}
        <div>
          <p>{userData.contactName}</p>
          <p>{userData.user_email}</p>
        </div>
      </div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} />
    </div>
  );
};
