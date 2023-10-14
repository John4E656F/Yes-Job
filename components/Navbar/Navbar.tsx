'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '..';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database, UsersTypes } from '@/types';
import { useToggleMenu } from '@/hooks';

interface NavbarProps {
  currentLocale: string;
  session: Session | null;
}

export function Navbar({ currentLocale, session }: NavbarProps) {
  const supabase = createClientComponentClient<Database>();
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

  const { menuRef: profileMenuRef, isMenuOpen: isProfileMenuOpen, toggleMenu: toggleProfileMenu } = useToggleMenu();
  const { menuRef: mobileMenuRef, isMenuOpen: isMobileMenuOpen, toggleMenu: toggleMobileMenu } = useToggleMenu();
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
          const { data: fetchedUserData, error: userError } = await supabase
            .from('users')
            .select('user_email, user_logo, user_name, contactName, user_total_request_count, isCompany, created_at, id, user_id')
            .eq('user_id', ownerID)
            .single();
          if (userError) {
            console.error('Error fetching user data:', userError);
          } else {
            setUserData(fetchedUserData);
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
    <nav className='w-full flex justify-center h-auto'>
      <div className='container flex justify-between items-center py-3 text-sm '>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <div className='flex items-center gap-3 md:gap-4'>
          <Button
            text={<HiBars3 size={40} />}
            btnType='button'
            onClick={toggleMobileMenu}
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
          <div className='hidden w-full items-center md:flex md:w-auto gap-3' id='navbar-default'>
            <ul className='font-medium flex flex-row p-2 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 '>
              <li>
                <Link
                  href='/'
                  className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 '
                  aria-current='page'
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href='/contact' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0'>
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                {!userData && (
                  <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200'>
                    Login
                  </Link>
                )}
              </li>
            </ul>
            <Button
              text={t('cta.publish')}
              btnType='button'
              onClick={() => router.push('/annonce')}
              className='hidden md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          </div>
          <div className='flex gap-2'>
            {session &&
              (userData.user_logo ? (
                <Button
                  text={<Image src={userData.user_logo} alt='user avatar' width={40} height={40} className='rounded-full p-1 ring-2 ring-gray-300' />}
                  btnType='button'
                  onClick={toggleProfileMenu}
                />
              ) : (
                <HiUser
                  size={40}
                  className='rounded-full p-1 ring-2 ring-gray-300 text-gray-400'
                  aria-label='user avatar'
                  onClick={toggleProfileMenu}
                />
              ))}
            <Button text={<HiMiniLanguage className='text-xl text-gray-400 ' />} btnType='button' onClick={toggleLocaleModal} />
          </div>
        </div>
        <ProfileMenu isMenuOpen={isProfileMenuOpen} toggleMenu={toggleProfileMenu} menuRef={profileMenuRef} t={t} userData={userData} />
        <MobileMenu isMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} menuRef={mobileMenuRef} t={t} session={session} />
      </div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} />
    </nav>
  );
}
