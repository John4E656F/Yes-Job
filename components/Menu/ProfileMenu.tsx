import React, { FC, RefObject } from 'react';
import { Link } from '..';
import type { TranslationProps, CompanyTypes } from '@/types';

interface ProfileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  userData: CompanyTypes;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, t, userData }) => {
  if (!isMenuOpen) return null;

  return (
    <div ref={menuRef} className='absolute top-20 justify-self-center w-11/12 border border-gray-300 rounded-md bg-brand-lightbg' id='navbar-menu'>
      <ul className='font-medium flex flex-col p-4 md:p-0 rounded-lg'>
        <li>
          <Link href='/' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu} aria-current='page'>
            {t('nav.home')}
          </Link>
        </li>
        <li>
          <Link href='/contact' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
            Profile
          </Link>
        </li>
        <li>
          <Link href={`/profile/$`} className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
            Profile
          </Link>
        </li>
        <li>
          <form action='/auth/sign-out' method='post'>
            <button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>Logout</button>
          </form>
        </li>
      </ul>
    </div>
  );
};
