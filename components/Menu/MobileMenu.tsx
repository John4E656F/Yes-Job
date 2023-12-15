import React, { FC, RefObject } from 'react';
import { Link } from '..';
import type { Session } from '@supabase/supabase-js';
import type { TranslationProps } from '@/types';

interface MobileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  session?: Session | null;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, session, t }) => {
  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      className='absolute top-14 right-0 justify-self-center w-auto border border-gray-300 rounded-md bg-brand-lightbg md:hidden'
      id='navbar-menu'
    >
      <ul className='font-medium flex flex-col p-4 md:p-0 rounded-lg list-none'>
        <li>
          <Link href='/' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' aria-current='page'>
            {t('nav.home')}
          </Link>
        </li>
        <li>
          <Link href='/contact' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200'>
            {t('nav.contact')}
          </Link>
        </li>
        <li>
          <Link href='/pricing' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200'>
            {t('nav.pricing')}
          </Link>
        </li>
        <li>
          {!session && (
            <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
              Login
            </Link>
          )}
        </li>
        <li>
          <Link
            href='/annonce'
            className='block py-2 pl-3 pr-4 bg-brand-primary text-white text-center rounded hover:bg-blue-200 mt-5 whitespace-nowrap'
            onClick={toggleMenu}
          >
            {t('cta.publish')}
          </Link>
        </li>
      </ul>
    </div>
  );
};
