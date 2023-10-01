import React from 'react';
import { Logo } from '..';
import { HiBars3 } from 'react-icons/hi2';

export const Navbar = () => {
  return (
    <nav className='w-full flex justify-center h-auto '>
      <div className='container flex justify-between items-center py-3 text-sm '>
        <a href='/home' className='flex items-center'>
          <Logo width={80} height={80} />
        </a>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <HiBars3 size={40} />
        </button>
        <div className='hidden w-full md:flex md:w-auto gap-10' id='navbar-default'>
          <ul className='font-medium flex flex-row p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  '>
            <li>
              <a href='/home' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ' aria-current='page'>
                Home
              </a>
            </li>
            <li>
              <a href='/contact' className='block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0'>
                Contact
              </a>
            </li>
          </ul>

          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='hidden md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            Publier une annonce
          </button>
        </div>
      </div>
    </nav>
  );
};
