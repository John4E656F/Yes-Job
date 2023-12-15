'use client';
import React, { FC, RefObject } from 'react';
import { Image, Button, Logo, Link, SidebarList, LocaleSwitcher, ProfileMenu } from '@/components';
import type { CompanyTypes, TranslationProps } from '@/types';
import { FaArrowLeft } from 'react-icons/fa';
import { HiXMark, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useToggleMenu } from '@/hooks';
import type { UsersTypes } from '@/types';

interface MobileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  userData?: UsersTypes;
  companyData: CompanyTypes;
  currentLocale: string;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, userData, companyData, t, currentLocale }) => {
  const { menuRef: localeModalRef, isMenuOpen: isLocaleModalOpen, toggleMenu: toggleLocaleModal } = useToggleMenu();

  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      className='absolute flex flex-col gap-5 py-5 top-1 right-0 px-5 justify-self-center w-full border border-gray-300 rounded-md bg-brand-lightbg md:hidden'
      id='navbar-menu'
    >
      <div className='flex justify-between items-center'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <div className='flex gap-5 items-center'>
          <div className='flex gap-2 items-center'>
            <Link
              href='/'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-gray-200'
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
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
        </div>
      </div>
      <SidebarList t={t} firstname={userData?.firstname} lastname={userData?.lastname} />
      <div className='flex gap-2 p-2 mt-auto'>
        {companyData.logo ? (
          <Button
            text={<Image src={companyData.logo} alt='user avatar' width={40} height={40} className='rounded-full p-1 ring-2 ring-gray-300' />}
            btnType='button'
          />
        ) : (
          <HiUser size={40} className='rounded-full p-1 ring-2 ring-gray-300 text-gray-400' aria-label='user avatar' />
        )}
        <div>
          <p>{userData!.firstname}</p>
          <p>{userData!.user_email}</p>
        </div>
      </div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} />
    </div>
  );
};
