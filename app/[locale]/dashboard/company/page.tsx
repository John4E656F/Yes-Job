import React from 'react';
import { Link, Divider, DashboardListingCard } from '@/components';
import { CompanyForm } from './form';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { refreshUserSession } from '@/lib/actions/refreshServerSession';
import { getTranslations } from 'next-intl/server';
import { RiShareBoxFill } from 'react-icons/ri';

export default async function CompanyPage() {
  const t = await getTranslations('dashboard');
  const session = await getServerUserSession();
  let sessionId;
  if (session) {
    sessionId = session.user.id;
  } else {
    const session = await refreshUserSession();
    sessionId = session.user.id;
  }

  const userResponse = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'
      ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/user/${sessionId}`
      : process.env.NEXT_PRIVATE_URL + `/api/user/${sessionId}`,
  );
  const { fetchedUserData } = await userResponse.json();
  console.log('fetchedUserData', fetchedUserData);

  const companyResponse = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'
      ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/company/${fetchedUserData.id}`
      : process.env.NEXT_PRIVATE_URL + `/api/company/${fetchedUserData.id}`,
  );
  const { fetchedCompanyData } = await companyResponse.json();
  console.log('fetchedCompanyData', fetchedCompanyData);

  return (
    <section className='w-full bg-white flex flex-col py-4 pt-10 px-10 gap-y-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <div>
            <h1>Company</h1>
            {fetchedCompanyData && fetchedCompanyData.slug ? (
              <Link href={`/companies/${fetchedCompanyData.slug}`} className='flex items-center justify-center text-center gap-2'>
                <p>yesjob.be/companies/{fetchedCompanyData && fetchedCompanyData.slug}</p> <RiShareBoxFill />
              </Link>
            ) : (
              <div className='flex items-center justify-center text-center'>
                <p>yesjob.be/companies/your company slug</p>
              </div>
            )}
          </div>
          <Link
            href='/annonce/publier'
            className='flex items-center h-11 justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <button type='button' className='px-4 h-11 text-sm'>
              View Company Profile
            </button>
          </Link>
        </div>
      </div>
      <CompanyForm companyData={fetchedCompanyData} userData={fetchedUserData} />
    </section>
  );
}
