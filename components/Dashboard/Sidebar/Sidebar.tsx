'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';
import { FaArrowLeft } from 'react-icons/fa';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import type { Session } from '@supabase/supabase-js';

import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '@/components';
import { SidebarList } from './SidebarList';
import { useToggleMenu } from '@/hooks';
import { UsersTypes } from '@/types';


interface SidebarProps {
  currentLocale: string;
  session?: Session | null;
}
export function Sidebar({ currentLocale, session }: SidebarProps) {
  // const supabase = createClientComponentClient<Database>();
  const router = useRouter();

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
  const { menuRef: localeModalRef, isMenuOpen: isLocaleModalOpen, toggleMenu: toggleLocaleModal } = useToggleMenu();
  const t = useTranslations('app');

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
    <aside className='fixed hidden h-screen w-64 min-w-fit flex-col gap-5 border-r bg-brand-lightbg bg-transparent p-5 md:flex'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
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
    </aside>
  );
}
