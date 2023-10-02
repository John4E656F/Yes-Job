import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Navbar, Image } from '@/components';
import SupabaseLogo from '../components/SupabaseLogo';
import NextJsLogo from '../components/NextJsLogo';
import DeployButton from '../components/DeployButton';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: countries } = await supabase.from('countries').select();

  return (
    <div className='container items-center justify-center'>
      <Navbar />
      <div className='flex flex-col container py-4 md:py-16 '>
        <div className='flex flex-col lg:flex-row gap-16 justify-between items-center '>
          <div className=' w-auto flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold'>Trouver les meilleures offres d’emploi dans horeca</h1>
            <h2 className='text-sm'>
              Que vous soyez à la recherche d'un emploi à temps plein, que vous souhaitiez gagner un peu plus d'argent en étudiant ou que vous ayez
              besoin d'argent supplémentaire pour vos vacances - vous trouverez chez nous une offre adaptée à vos besoins !
            </h2>
            <button
              data-collapse-toggle='navbar-default'
              type='button'
              className=' md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
              aria-controls='navbar-default'
              aria-expanded='false'
            >
              Publier une annonce
            </button>
          </div>
          <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-auto lg:max-w-sm max-h-lg object-fill bg-blue-200 rounded-2xl' />
        </div>
      </div>
    </div>
  );
}
