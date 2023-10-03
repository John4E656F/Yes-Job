import React from 'react';
import Link from 'next/link';
import { BsPinAngle, BsBullseye, BsFacebook, BsGoogle } from 'react-icons/bs';

const AnnoncePage = () => {
  return (
    <header className='w-full flex justify-center'>
      <div className='flex flex-col container justify-center  py-4 md:py-16 '>
        <div className=' w-auto flex flex-col gap-12 text-center'>
          <h1 className='text-4xl font-semibold'>Nous sommes heureux que vous souhaitiez ajouter une annonce chez nous !</h1>
          <h3 className='text-2xl'>YES Job est le meilleur endroit pour trouver et publier des offres d'emploi dans l'horeca</h3>
          <div className='flex md:justify-center'>
            <ul className='flex flex-col text-lg text-left gap-3'>
              <li className='flex items-center gap-2 overflow-hidden'>
                <div>
                  <BsPinAngle size={24} />
                </div>
                <p>30 jours de promotion sur la page d'accueil</p>
              </li>
              <li className='flex items-center gap-2  overflow-hidden'>
                <div>
                  <BsBullseye size={24} />
                </div>
                <p>Optimisation de l'offre</p>
              </li>
              <li className='flex items-center gap-2  overflow-hidden'>
                <div>
                  <BsFacebook size={24} />
                </div>
                <p>Campagne Facebook</p>
              </li>
              <li className='flex items-center gap-2 overflow-hidden'>
                <div>
                  <BsGoogle size={24} />
                </div>
                <p>Campagne Google</p>
              </li>
              <li className='flex items-center gap-2'>
                <div>
                  <BsGoogle size={24} />
                </div>
                <p>Distribution dans le réseau de recrutement Google for Jobs</p>
              </li>
            </ul>
          </div>
          <Link href='/annonce/publier' className='flex justify-center'>
            <button
              type='button'
              className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
            >
              Ajoutez votre annonce gratuitement
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default AnnoncePage;
