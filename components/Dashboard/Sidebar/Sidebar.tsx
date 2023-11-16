'use client';
import React from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '../../';
import { FaArrowLeft } from 'react-icons/fa';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useToggleMenu } from '@/hooks';

interface NavbarProps {
  currentLocale: string;
  session: Session | null;
}

export const Sidebar = ({ currentLocale, session }: NavbarProps) => {
  const { menuRef: localeModalRef, isMenuOpen: isLocaleModalOpen, toggleMenu: toggleLocaleModal } = useToggleMenu();

  return (
    <aside className=' flex flex-col gap-5 p-5 w-64 min-w-fit border-r border-b rounded-br-md bg-brand-lightbg'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <div className='flex gap-2 items-center'>
          <Button
            text={<FaArrowLeft size={40} />}
            btnType='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
          <Button
            text={<HiMiniLanguage className='text-xl text-gray-400 hover:text-brand-hover' size={30} />}
            btnType='button'
            onClick={toggleLocaleModal}
          />
        </div>
      </div>
      <div>Hello World</div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} />
    </aside>
  );
};
