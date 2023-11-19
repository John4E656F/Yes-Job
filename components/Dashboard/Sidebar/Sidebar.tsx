import React from 'react';
import { useRouter } from 'next/navigation';
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';
import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '../../';
import { FaArrowLeft } from 'react-icons/fa';
import { HiBars3, HiMiniLanguage, HiUser } from 'react-icons/hi2';
import { SidebarList } from './SidebarList';
// import { useToggleMenu } from '@/hooks';
import { Database, UsersTypes } from '@/types';

interface NavbarProps {
  currentLocale: string;
  // session?: Session | null;
}

export const Sidebar = ({ currentLocale }: NavbarProps) => {
  // const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // const { menuRef: localeModalRef, isMenuOpen: isLocaleModalOpen, toggleMenu: toggleLocaleModal } = useToggleMenu();
  const t = useTranslations('app');

  return (
    <aside className='fixed flex flex-col h-screen gap-5 p-5 w-64 min-w-fit border-r bg-brand-lightbg bg-transparent'>
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
          {/* <Button
            text={<HiMiniLanguage className='text-xl text-gray-400 hover:text-brand-hover' size={30} />}
            btnType='button'
            onClick={toggleLocaleModal}
          /> */}
        </div>
      </div>
      {/* <SidebarList t={t} companyName={currentUser.user_name} /> */}
      {/* <div className='flex gap-2 p-2 mt-auto'> */}
      {/* {session &&
          (currentUser.user_logo ? (
            <Button
              text={<Image src={currentUser.user_logo} alt='user avatar' width={40} height={40} className='rounded-full p-1 ring-2 ring-gray-300' />}
              btnType='button'
            />
          ) : (
            <HiUser size={40} className='rounded-full p-1 ring-2 ring-gray-300 text-gray-400' aria-label='user avatar' />
          ))}
        <div>
          <p>{currentUser.contactName}</p>
          <p>{currentUser.user_email}</p>
        </div>
      </div>
      <LocaleSwitcher isOpen={isLocaleModalOpen} closeModal={toggleLocaleModal} onClose={toggleLocaleModal} currentLocale={currentLocale} /> */}
    </aside>
  );
};
