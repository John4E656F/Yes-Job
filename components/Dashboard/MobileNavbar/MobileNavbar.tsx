'use client';
import React, { useEffect, useState } from 'react';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import type { Session } from '@supabase/supabase-js';

import { MobileMenu } from './Menu';
import { Image, Button, Logo, Link } from '@/components';
import { useToggleMenu } from '@/hooks';
import type { UsersTypes } from '@/types';

interface NavbarProps {
  currentLocale: string;
  session?: Session | null;
}
export function MobileNavbar({ currentLocale, session }: NavbarProps) {
  const t = useTranslations('app');
  const [userData, setUserData] = useState<UsersTypes>({
    user_email: '',
    user_logo: '',
    user_name: '',
    user_total_request_count: undefined,
    isCompany: false,
    contactName: '',
    created_at: '',
    id: '',
    user_id: '',
  });

  const { menuRef: mobileMenuRef, isMenuOpen: isMobileMenuOpen, toggleMenu: toggleMobileMenu } = useToggleMenu();

  useEffect(() => {
    const fetchUserData = async () => {
      let ownerID;

      if (session && session.user) {
        ownerID = session.user.id;
      }

      if (ownerID) {
        try {
          const response = await fetch(`/api/user/${ownerID}`);
          if (response.ok) {
            const { fetchedUserData } = await response.json();
            setUserData(fetchedUserData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No owner ID found');
      }
    };
    fetchUserData();
  }, []);

  return (
    <nav className='flex h-auto w-full justify-center md:hidden'>
      <div className=' container relative flex w-full items-center justify-between py-3 text-sm'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <Button
          text={<HiBars3 size={40} />}
          btnType='button'
          onClick={toggleMobileMenu}
          className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden'
        />
        <MobileMenu
          isMenuOpen={isMobileMenuOpen}
          toggleMenu={toggleMobileMenu}
          menuRef={mobileMenuRef}
          userData={userData}
          t={t}
          currentLocale={currentLocale}
        />
      </div>
    </nav>
  );
}
