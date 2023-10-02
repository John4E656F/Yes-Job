import React from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export const SearchBar = () => {
  return (
    <form>
      <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <HiOutlineMagnifyingGlass />
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:brand-primary'
          placeholder='Recherchez une ville, des emplois...'
          required
        />
        <button
          type='submit'
          className='bg-brand-primary text-white  hover:bg-blue-800 focus:ring-gray-200 absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none rounded-lg text-sm px-4 py-2 '
        >
          Recherche
        </button>
      </div>
    </form>
  );
};
