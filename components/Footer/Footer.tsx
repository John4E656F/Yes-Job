import React from 'react';
import Link from 'next/link';
import { Logo } from '..';

export const Footer = () => {
  return (
    <footer className='w-full flex flex-col items-center'>
      <div className='container flex flex-col md:flex-row items-center justify-between text-sm gap-4 pt-16 pb-12'>
        <div className='flex flex-col items-center md:items-start max-w-xs'>
          <Link href='/' className=''>
            <Logo width={80} height={80} />
          </Link>
          <p className='text-sm'>Connectez-vous aux professionnels Horeca passionnés pour des carrières florissantes</p>
        </div>
        <div className='flex flex-wrap gap-8'>
          <div className='flex flex-col flex-1 items-start'>
            <h6 className='text-lg'>Yes job</h6>
            <Link href='/contact' className='font-semibold text-blue-600'>
              Contact
            </Link>
          </div>
          <div className='flex flex-col flex-1 items-start whitespace-nowrap'>
            <h6 className='text-lg'>Candidats</h6>
            <Link href='/' className='font-semibold text-blue-600'>
              Offres d'emploi
            </Link>
          </div>
          <div className='flex flex-col flex-1 items-start whitespace-nowrap	'>
            <h6 className='text-lg'>Employeurs</h6>
            <Link href='/annonce' className='font-semibold text-blue-600'>
              Publier une annonce
            </Link>
            <Link href='/connecter' className='font-semibold text-blue-600'>
              Consultez votre annonce
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full text-center justify-center py-10 gap-3.5 bg-brand-lightbg'>
        <div className='flex gap-4 justify-center'>
          <Link href='/conditions' className='text-xs font-light '>
            Conditions d'utilisation
          </Link>
          <Link href='/confidentialité' className='text-xs font-light'>
            Protection de la vie privée
          </Link>
          <Link href='/cookies' className='text-xs font-light'>
            Cookies
          </Link>
        </div>
        <p>© 2023 Yes Job. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
