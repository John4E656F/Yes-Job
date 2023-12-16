'use client';
import React, { useEffect, useState } from 'react';
import { Image, Button, Logo, Link } from '@/components';
import { MobileMenu } from './Menu';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import type { Session } from '@supabase/supabase-js';
import { useToggleMenu } from '@/hooks';
import type { CompanyTypes, UsersTypes } from '@/types';

interface NavbarProps {
  currentLocale: string;
  session?: Session | null;
}
export function MobileNavbar({ currentLocale, session }: NavbarProps) {
  const t = useTranslations('app');
  const [userData, setUserData] = useState<UsersTypes>();
  const [companyData, setCompanyData] = useState<CompanyTypes>();

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

            const responseCompany = await fetch(`/api/company/${fetchedUserData.id}`);
            const { fetchedCompanyData } = await responseCompany.json();
            setCompanyData(fetchedCompanyData);
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
  console.log('user data:', userData);
  console.log('company data:', companyData);

  return (
    <nav className='md:hidden w-full flex justify-center h-auto'>
      <div className=' w-full container flex justify-between items-center py-3 text-sm relative'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <Button
          text={<HiBars3 size={40} />}
          btnType='button'
          onClick={toggleMobileMenu}
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
        />
        <MobileMenu
          isMenuOpen={isMobileMenuOpen}
          toggleMenu={toggleMobileMenu}
          menuRef={mobileMenuRef}
          userData={userData}
          companyData={companyData}
          t={t}
          currentLocale={currentLocale}
        />
      </div>
    </nav>
  );
}
