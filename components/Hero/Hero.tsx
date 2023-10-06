import React from 'react';
import { Image } from '..';
import Link from 'next/link';

export const Hero = () => {
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center py-4 md:py-16 '>
        <div className='flex flex-col lg:flex-row gap-16 justify-between items-center '>
          <div className=' w-auto flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>Trouver les meilleures offres d’emploi dans horeca</h1>
            <h3 className='text-sm'>
              Que vous soyez à la recherche d'un emploi à temps plein, que vous souhaitiez gagner un peu plus d'argent en étudiant ou que vous ayez
              besoin d'argent supplémentaire pour vos vacances - vous trouverez chez nous une offre adaptée à vos besoins !
            </h3>
            <Link href='/annonce'>
              <button
                data-collapse-toggle='navbar-default'
                type='button'
                className=' md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
                aria-controls='navbar-default'
                aria-expanded='false'
              >
                Publier une annonce
              </button>
            </Link>
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto lg:max-w-sm max-h-lg object-fill bg-blue-200 rounded-2xl' />
        </div>
      </div>
    </header>
  );
};
