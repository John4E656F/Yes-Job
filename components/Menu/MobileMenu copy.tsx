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
    <div ref={menuRef} className='fixed top-20 flex w-full items-center md:hidden' id='navbar-menu'>
      <article className='w-4/5  rounded-md border border-gray-300 bg-brand-lightbg'>
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
            {/* {!session && (
              <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' onClick={toggleMenu}>
                Login
              </Link>
            )} */}
          </li>
          <li>
            <Link
              href='/annonce'
              className='mt-5 block rounded bg-brand-primary py-2 pl-3 pr-4 text-center text-white hover:bg-blue-200'
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
