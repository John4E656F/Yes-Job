import React from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export const SearchBar = () => {
  return (
    <form>
      <label htmlFor='default-search' className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <HiOutlineMagnifyingGlass />
        </div>
        <input
          type='search'
          id='default-search'
          className='focus:brand-primary block w-full rounded-lg border border-gray-300 p-4 pl-10 text-sm'
          placeholder='Recherchez une ville, des emplois...'
          required
        />
        <button
          type='submit'
          className='absolute bottom-2.5  right-2.5 rounded-lg bg-brand-primary px-4 py-2  text-sm text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-200 '
        >
          Recherche
        </button>
      </div>
    </form>
  );
};
