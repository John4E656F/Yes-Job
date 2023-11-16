import React, { FC, RefObject } from 'react';
import { Link } from '..';
import type { TranslationProps, UsersTypes } from '@/types';

interface ProfileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  userData: UsersTypes;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, t, userData }) => {
  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      className='absolute top-14 right-0 max-w-2xl justify-self-center w-auto border border-gray-300 rounded-md bg-brand-lightbg'
      id='navbar-menu'
    >
      <ul className='font-medium flex flex-col p-4 md:p-0 rounded-lg list-none'>
        <li>
          <Link href={`profile/${userData.id}`} className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
            Profile
          </Link>
        </li>
        {/* <li>
          <Link href={`/profile/${userData.id}`} className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
            Settings
          </Link>
        </li> */}
        <li>
          <form action='/auth/sign-out' method='post'>
            <button className='block text-start py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200 w-full '>Logout</button>
          </form>
        </li>
      </ul>
    </div>
  );
};
