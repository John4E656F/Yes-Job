'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Logo, Link, LocaleSwitcher } from '..';
import { HiBars3, HiMiniLanguage } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';

interface NavbarProps {
  currentLocale: string;
}

export function Navbar({ currentLocale }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth/login';
  const isRegisterPage = pathname === '/auth/register';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLangSwitcher = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const t = useTranslations('app');

  return (
    <nav className='w-full flex justify-center h-auto'>
      <div className='container flex justify-between items-center py-3 text-sm '>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>
        <div className='flex items-center'>
          <button
            type='button'
            onClick={toggleMenu}
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            aria-label='hamburger button'
            aria-expanded={isMenuOpen}
          >
            <HiBars3 size={40} />
          </button>
          <Link
            href='#'
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <HiMiniLanguage className='text-xl text-gray-400 md:hidden' />
          </Link>
        </div>
        {isMenuOpen && (
          <div className='absolute top-20 justify-self-center w-11/12 border border-gray-300 rounded-md bg-brand-lightbg md:hidden' id='navbar-menu'>
            <ul className='font-medium flex flex-col p-4 md:p-0 rounded-lg'>
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
                <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200'>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className='hidden w-full items-center md:flex md:w-auto gap-10' id='navbar-default'>
          <ul className='font-medium flex flex-row p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 '>
            <li>
              <Link href='/' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ' aria-current='page'>
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link href='/contact' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0'>
                {t('nav.contact')}
              </Link>
            </li>
            <li>
              <Link href='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200'>
                Login
              </Link>
            </li>
          </ul>
          <Link href='/annonce'>
            <button
              data-collapse-toggle='navbar-default'
              type='button'
              className='hidden md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
              aria-controls='navbar-default'
              aria-expanded='false'
            >
              {t('cta.publish')}
            </button>
          </Link>
          <Link
            href='#'
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <HiMiniLanguage className='text-xl text-gray-400 ' />
          </Link>
        </div>
      </div>
      <LocaleSwitcher isOpen={isModalOpen} closeModal={toggleLangSwitcher} onClose={() => setIsModalOpen(false)} currentLocale={currentLocale} />
    </nav>
  );
}
