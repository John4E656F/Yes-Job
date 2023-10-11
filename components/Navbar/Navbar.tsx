'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '..';
import { HiBars3 } from 'react-icons/hi2';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='w-full flex justify-center h-auto'>
      <div className='container flex justify-between items-center py-3 text-sm '>
        <Link href='/' className='flex items-center' aria-label='YesJob Navbar Logo'>
          <Logo width={80} height={80} />
        </Link>

        <button
          type='button'
          onClick={toggleMenu}
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-label='hamburger button'
          aria-expanded={isMenuOpen}
        >
          <HiBars3 size={40} />
        </button>
        {isMenuOpen && (
          <div className='absolute top-20 justify-self-center w-11/12 border border-gray-300 rounded-md bg-brand-lightbg md:hidden' id='navbar-menu'>
            <ul className='font-medium flex flex-col p-4 md:p-0 rounded-lg'>
              <li>
                <Link href='/' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200' aria-current='page'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/contact' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-200'>
                  Contact
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

        <div className='hidden w-full md:flex md:w-auto gap-10' id='navbar-default'>
          <ul className='font-medium flex flex-row p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 '>
            <li>
              <Link href='/' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ' aria-current='page'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/contact' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0'>
                Contact
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
              Publier une annonce
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
