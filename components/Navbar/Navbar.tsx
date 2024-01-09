'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu, Toast } from '..';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import { UsersTypes, CompanyTypes, ListingData, ToastTitle } from '@/types';
import { useToggle, useToggleMenu } from '@/hooks';
import type { Session } from '@supabase/supabase-js';
import { getCurrentUserJobListing } from '@/lib/actions/jobPost';

interface NavbarProps {
  currentLocale: string;
  session?: Session | null;
}

export function Navbar({ currentLocale, session }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [userData, setUserData] = useState<UsersTypes>();
  const [companyData, setCompanyData] = useState<CompanyTypes>({
    id: '',
    name: '',
    logo: '',
    phone: null,
    owner_id: '',
    teamMembers: [''],
  });
  const [isFirstPost, setIsFirstPost] = useState<boolean>(false);
  const [needUpgrade, setNeedUpgrade] = useState<boolean>(false);
  const [usedListingCount, setUsedListingCount] = useState<number>(0);
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);
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
          const response = await fetch(`/api/user/${ownerID}`);

          if (response.ok) {
            const { fetchedUserData } = await response.json();
            // console.log(fetchedUserData);

            const responseCompany = await fetch(`/api/company/${fetchedUserData.id}`);
            const { fetchedCompanyData } = await responseCompany.json();
            if (fetchedCompanyData) {
              // console.log(fetchedCompanyData);
              setCompanyData(fetchedCompanyData);
              const companyId = fetchedCompanyData.id;

              const fetchedUserListing = await getCurrentUserJobListing({ company_Id: companyId, path: pathname });
              // console.log('fetchedUserListing', fetchedUserListing);

              if (fetchedUserListing) {
                const publishedListingCount = fetchedUserListing.filter((listing: ListingData) => listing.published === true).length;

                if (publishedListingCount === fetchedCompanyData.availableJobListing) {
                  setNeedUpgrade(true);
                  setUsedListingCount(publishedListingCount);
                }
              } else {
                setIsFirstPost(true);
              }
            }

            setUserData(fetchedUserData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // console.log('No owner ID found');
      }
    };
    fetchUserData();
  }, [session?.access_token]);

  // console.log('userData', userData);
  // console.log('companyData', companyData);
  // console.log(usedListingCount);

  const onClickPost = () => {
    if (usedListingCount === companyData.availableJobListing) {
      toggleToast(true);
      // setTimeout(() => {
      //   // router.push(`/upgrade`);
      //   toggleToast(false);
      // }, 10000);
    } else {
      router.push(`/publier`);
    }
  };
  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };
  return (
    <nav className='w-full flex justify-center h-auto relative'>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={ToastTitle.Error}
        message={t('error.notEnoughListing')}
        link={{ href: '/pricing', text: t('error.pleaseUpgrade') }}
      />
      <div className='container flex justify-between items-center py-3 text-sm relative'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <div className='flex items-center gap-3 md:gap-4 relative'>
          <Button
            text={<HiBars3 size={40} />}
            btnType='button'
            onClick={toggleMobileMenu}
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
          <div className='hidden w-full items-center md:flex md:w-auto gap-3' id='navbar-default'>
            <ul className='font-bold text-lg flex flex-row p-2 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 list-none'>
              <li>
                <Link href='/' className='block py-2 text-gray-900 rounded hover:text-gray-400 md:border-0 ' aria-current='page'>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href='/pricing' className='block py-2 text-gray-900 rounded hover:text-gray-400 md:border-0'>
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link href='/contact' className='block py-2 text-gray-900 rounded hover:text-gray-400 md:border-0'>
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                {!session && (
                  <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-gray-400'>
                    Login
                  </Link>
                )}
              </li>
            </ul>
            {isFirstPost || !userData ? (
              <Button
                text={t('cta.publish')}
                btnType='button'
                onClick={() => router.push('/annonce')}
                className='hidden md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
              />
            ) : (
              <Button
                text={t('cta.publish')}
                btnType='button'
                onClick={onClickPost}
                className='hidden md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
              />
            )}
          </div>
          <div className='flex gap-2 cursor-pointer'>
            {session &&
              (companyData.logo ? (
                <Button
                  className='rounded-full p-1 ring-2 ring-gray-300 max-h-10 max-w-10 w-10 h-10 overflow-hidden'
                  text={<Image src={companyData.logo} alt='user avatar' width={40} height={40} className='rounded' />}
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
            <Button text={<HiMiniLanguage className='text-xl text-gray-400 hover:text-gray-200' />} btnType='button' onClick={toggleLocaleModal} />
          </div>
          <MobileMenu isMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} menuRef={mobileMenuRef} session={session} t={t} />
          <ProfileMenu isMenuOpen={isProfileMenuOpen} toggleMenu={toggleProfileMenu} menuRef={profileMenuRef} t={t} userData={userData!} />
        </div>
      </div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} />
    </nav>
  );
}
