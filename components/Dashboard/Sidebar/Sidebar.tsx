'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';
import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '@/components';
import { FaArrowLeft } from 'react-icons/fa';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { FaRegCircle, FaRegCircleCheck } from 'react-icons/fa6';
import { SidebarList } from './SidebarList';
import { useToggleMenu } from '@/hooks';
import { UsersTypes } from '@/types';
import type { Session } from '@supabase/supabase-js';
import { set } from 'date-fns';

interface SidebarProps {
  currentLocale: string;
  session?: Session | null;
}
interface ChecklistData {
  tag: string;
  title: string;
  boolean: boolean;
}
export function Sidebar({ currentLocale, session }: SidebarProps) {
  // const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [checklistData, setChecklistData] = useState<ChecklistData[]>([
    {
      tag: 'email',
      title: 'Verify your email',
      boolean: false,
    },
    {
      tag: 'company',
      title: 'Add Company Info',
      boolean: false,
    },
    {
      tag: 'post',
      title: 'Post your first job listing',
      boolean: false,
    },
  ]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const [userData, setUserData] = useState<UsersTypes>({
    user_email: '',
    user_logo: '',
    user_name: '',
    contactName: '',
    created_at: '',
    id: '',
    user_id: '',
    company_id: '',
  });
  const { menuRef: localeModalRef, isMenuOpen: isLocaleModalOpen, toggleMenu: toggleLocaleModal } = useToggleMenu();
  const t = useTranslations('app');
  console.log(session);

  useEffect(() => {
    const fetchUserData = async () => {
      let ownerID;

      if (session && session.user) {
        ownerID = session.user.id;
        setChecklistData((prevState) => prevState.map((item) => (item.tag === 'email' ? { ...item, boolean: true } : item)));
      }

      if (ownerID) {
        try {
          const response = await fetch(`/api/user/${ownerID}`);

          if (response.ok) {
            const { fetchedUserData } = await response.json();
            console.log(fetchedUserData);
            setUserData(fetchedUserData);
            const responseCompany = await fetch(`/api/company/${fetchedUserData.id}`);
            const { fetchedCompanyData } = await responseCompany.json();
            if (fetchedCompanyData) {
              setChecklistData((prevState) => prevState.map((item) => (item.tag === 'company' ? { ...item, boolean: true } : item)));
            }
            const responseJobListing = await fetch(`/api/jobPost/${fetchedUserData.id}`);
            const { fetchedJobPostData } = await responseJobListing.json();
            if (fetchedJobPostData) {
              setChecklistData((prevState) => prevState.map((item) => (item.tag === 'post' ? { ...item, boolean: true } : item)));
            }
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

  useEffect(() => {
    const totalItems = checklistData.length;
    const completedItems = checklistData.filter((item) => item.boolean === true).length;
    const newCompletionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    setCompletionPercentage(newCompletionPercentage);
  }, [checklistData]);
  console.log(completionPercentage);

  return (
    <aside className='hidden fixed md:flex flex-col h-screen gap-5 p-5 w-64 min-w-fit border-r bg-brand-lightbg'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
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
      </div>
      <SidebarList t={t} companyName={userData.user_name} />
      <div className='flex flex-col gap-2 mt-auto w-64 min-w-fit'>
        {checklistData.every((item) => item.boolean) ? null : (
          <div className='flex flex-col bg-gray-100 px-3 py-5 gap-3 rounded'>
            <p className='text-lg font-semibold'>Finish settings up your profile</p>
            <p>Complete this checklist to optimize your presence and attract the best talent. </p>
            <div className='flex flex-col gap-2 my-3'>
              <div className='w-full bg-white rounded-full h-2.5 mb-3'>
                <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: `${completionPercentage}%` }} />
              </div>
              {checklistData.map((item, index) => (
                <div key={item.tag} className='flex items-center gap-2'>
                  {item.boolean ? (
                    <div className='bg-white rounded-full'>
                      <FaRegCircleCheck className='text-brand-primary' size={20} />
                    </div>
                  ) : (
                    <div className='bg-white rounded-full'>
                      <FaRegCircle className='text-brand-primary' size={20} />
                    </div>
                  )}
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
            <Link
              href='/publier'
              className='flex items-center justify-center h-fit text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 '
            >
              <button type='button' className='px-4 py-2 text-sm whitespace-nowrap'>
                {t('cta.postAJob')}
              </button>
            </Link>
          </div>
        )}
        <div className='flex gap-2 items-center'>
          {userData.user_logo ? (
            <Button
              text={<Image src={userData.user_logo} alt='user avatar' width={40} height={40} className='rounded-full p-1 ring-2 ring-gray-300' />}
              btnType='button'
            />
          ) : (
            <HiUser size={40} className='rounded-full p-1 ring-2 ring-gray-300 text-gray-400' aria-label='user avatar' />
          )}
          <div>
            <p>{userData.contactName}</p>
            <p>{userData.user_email}</p>
          </div>
        </div>
      </div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} />
    </aside>
  );
}
