import React, { FC, RefObject } from 'react';
import type { Session } from '@supabase/supabase-js';

import { Link } from '..';
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
      className='absolute right-0 top-14 w-auto justify-self-center rounded-md border border-gray-300 bg-brand-lightbg md:hidden'
      id='navbar-menu'
    >
      <ul className='flex list-none flex-col rounded-lg p-4 font-medium md:p-0'>
        <li>
          <Link href='/' className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-blue-200' onClick={toggleMenu} aria-current='page'>
            {t('nav.home')}
          </Link>
        </li>
        <li>
          <Link href='/contact' className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
            {t('nav.contact')}
          </Link>
        </li>
        <li>
          {!session && (
            <Link href='/login' className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-blue-200' onClick={toggleMenu}>
              Login
            </Link>
          )}
        </li>
        <li>
          <Link
            href='/annonce'
            className='mt-5 block whitespace-nowrap rounded bg-brand-primary py-2 pl-3 pr-4 text-center text-white hover:bg-blue-200'
            onClick={toggleMenu}
          >
            {t('cta.publish')}
          </Link>
        </li>
      </ul>
    </div>
  );
};
