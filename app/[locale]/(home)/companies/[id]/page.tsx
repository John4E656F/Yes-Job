import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Image, ListingCard } from '@/components';
import { CompanyTypes, ListingData } from '@/types';
import { getTranslations } from 'next-intl/server';

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const t = await getTranslations('app');
  const supabase = createClient();
  const companyId = params.id;
  console.log(companyId);

  const { data: fetchedCompanyData, error: fetchedCompanyError } = await supabase
    .from('company')
    .select(`*, jobListings:jobPosting(*, company:company(*))`)
    .eq('id', companyId)
    .single();

  console.log(fetchedCompanyData);

  if (fetchedCompanyError) {
    //   return { fetchedCompanyError: 'Failed to fetch user data: ' + fetchedCompanyError.message });
  }
  //   const { fetchedCompanyData } = await response.json();
  //   const companyData: CompanyTypes = fetchedCompanyData;

  //   console.log(companyData);

  return (
    <>
      <header className='w-full flex justify-center py-4 bg-brand-lightbg'>
        <div className='container flex flex-row items-center md:flex-row'>
          <Image
            src={fetchedCompanyData.logo as string}
            alt='Yes Job'
            className='w-20 m-5 h-20 md:w-24 md:h-24 object-contain bg-blue-200 rounded-2xl'
            unoptimized
          />
          <div className=''>
            <h1 className='text-base font-semibold md:text-lg'>{fetchedCompanyData.name}</h1>
            {fetchedCompanyData.website && <p className='text-base md:text-lg'>{fetchedCompanyData.website}</p>}

            {/* <p className='text-base md:text-lg'>{jobPost.company?.name}</p> */}
          </div>
        </div>
      </header>
      <section className='container flex flex-col gap-4 mt-10 bg-white'>
        {fetchedCompanyData.about && (
          <div className='flex flex-col gap2'>
            <h2>About</h2>
            <p>{fetchedCompanyData.about}</p>
          </div>
        )}
        <div className='flex flex-col gap-2'>
          <h2>
            {fetchedCompanyData.jobListings.length} jobs at {fetchedCompanyData.name}{' '}
          </h2>
          <div className='flex flex-col gap-4'>
            {fetchedCompanyData.jobListings.map((jobPost: ListingData) => (
              <ListingCard key={jobPost.id} jobPost={jobPost} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
