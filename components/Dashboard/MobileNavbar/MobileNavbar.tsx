'use client';
import React from 'react';
import { Image, Button, Logo, Link } from '@/components';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
// import { useTranslations } from 'next-intl';
import type { Session } from '@supabase/supabase-js';
import { useToggleMenu } from '@/hooks';

export const MobileNavbar = () => {
  const { menuRef: mobileMenuRef, isMenuOpen: isMobileMenuOpen, toggleMenu: toggleMobileMenu } = useToggleMenu();
  return (
    <nav>
      <div className='md:hidden container flex justify-between items-center py-3 text-sm relative'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <Button
          text={<HiBars3 size={40} />}
          btnType='button'
          onClick={toggleMobileMenu}
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
        />
      </div>
    </nav>
  );
};
