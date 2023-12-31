import React, { FC, RefObject } from 'react';
import { Link } from '..';
// import { Session } from '@supabase/auth-helpers-nextjs';
import type { TranslationProps } from '@/types';

interface MobileMenuProps extends TranslationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
  // session: Session | null;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu, menuRef, t }) => {
  if (!isMenuOpen) return null;

  return (
    <div ref={menuRef} className='fixed top-20 flex items-center w-full md:hidden' id='navbar-menu'>
      <article className='w-4/5  border border-gray-300 rounded-md bg-brand-lightbg'>
        <ul className='font-medium flex flex-col p-4 md:p-0 rounded-lg list-none'>
          <li>
            <Link href='/' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu} aria-current='page'>
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link href='/contact' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
              {t('nav.contact')}
            </Link>
          </li>
          <li>
            {/* {!session && (
              <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
                Login
              </Link>
            )} */}
          </li>
          <li>
            <Link
              href='/annonce'
              className='block py-2 pl-3 pr-4 bg-brand-primary text-white text-center rounded hover:bg-blue-200 mt-5'
              onClick={toggleMenu}
            >
              {t('cta.publish')}
            </Link>
          </li>
        </ul>
      </article>
    </div>
  );
};
