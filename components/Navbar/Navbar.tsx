'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import type { Session } from '@supabase/supabase-js';

import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '..';
import { UsersTypes } from '@/types';
import { useToggleMenu } from '@/hooks';

interface NavbarProps {
  currentLocale: string;
  session?: Session | null;
}

export function Navbar({ currentLocale, session }: NavbarProps) {
  const router = useRouter();

  const [userData, setUserData] = useState<UsersTypes>({
    user_email: '',
    user_logo: '',
    user_name: '',
    user_total_request_count: null,
    isCompany: false,
    contactName: '',
    created_at: '',
    id: '',
    user_id: '',
  });

  const {
    menuRef: profileMenuRef,
    isMenuOpen: isProfileMenuOpen,
    toggleMenu: toggleProfileMenu,
  } = useToggleMenu();
  const {
    menuRef: mobileMenuRef,
    isMenuOpen: isMobileMenuOpen,
    toggleMenu: toggleMobileMenu,
  } = useToggleMenu();
  const {
    menuRef: localeModalRef,
    isMenuOpen: isLocaleModalOpen,
    toggleMenu: toggleLocaleModal,
  } = useToggleMenu();
  const t = useTranslations('app');

  useEffect(() => {
    console.log('useEffect triggered');
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
    <nav className="relative flex h-auto w-full justify-center">
      <div className="container relative flex items-center justify-between py-3 text-sm">
        <Link href="/" className="flex items-center" aria-label="YesJob Navbar Logo">
          <Logo width={80} height={80} />
        </Link>
        <div className="relative flex items-center gap-3 md:gap-4">
          <Button
            text={<HiBars3 size={40} />}
            btnType="button"
            onClick={toggleMobileMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          />
          <div className="hidden w-full items-center gap-3 md:flex md:w-auto" id="navbar-default">
            <ul className="mt-4 flex list-none flex-row rounded-lg p-2 text-lg font-bold md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
              <li>
                <Link
                  href="/"
                  className="block rounded py-2 text-gray-900 hover:text-gray-400 md:border-0 "
                  aria-current="page"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block rounded py-2 text-gray-900 hover:text-gray-400 md:border-0"
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                {!session && (
                  <Link
                    href="/login"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:text-gray-400"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
            <Button
              text={t('cta.publish')}
              btnType="button"
              onClick={() => router.push('/annonce')}
              className="hidden h-11 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 md:block md:w-auto"
            />
          </div>
          <div className="flex cursor-pointer gap-2">
            {session &&
              (userData.user_logo ? (
                <Button
                  text={
                    <Image
                      src={userData.user_logo}
                      alt="user avatar"
                      width={40}
                      height={40}
                      className="rounded-full p-1 ring-2 ring-gray-300"
                    />
                  }
                  btnType="button"
                  onClick={toggleProfileMenu}
                />
              ) : (
                <HiUser
                  size={40}
                  className="rounded-full p-1 text-gray-400 ring-2 ring-gray-300"
                  aria-label="user avatar"
                  onClick={toggleProfileMenu}
                />
              ))}
            <Button
              text={<HiMiniLanguage className="text-xl text-gray-400 hover:text-gray-200" />}
              btnType="button"
              onClick={toggleLocaleModal}
            />
          </div>
          <MobileMenu
            isMenuOpen={isMobileMenuOpen}
            toggleMenu={toggleMobileMenu}
            menuRef={mobileMenuRef}
            session={session}
            t={t}
          />
          <ProfileMenu
            isMenuOpen={isProfileMenuOpen}
            toggleMenu={toggleProfileMenu}
            menuRef={profileMenuRef}
            t={t}
            userData={userData}
          />
        </div>
      </div>
      <LocaleSwitcher
        isOpen={isLocaleModalOpen}
        closeModal={toggleLocaleModal}
        onClose={toggleLocaleModal}
        currentLocale={currentLocale}
      />
    </nav>
  );
}
