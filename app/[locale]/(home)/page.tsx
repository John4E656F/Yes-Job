import { Hero, Listing } from '@/components';

import type { UsersTypes, CompanyTypes, ListingData, SessionTypes } from '@/types';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';
import { refreshUserSession } from '@/lib/actions/refreshServerSession';

// export const dynamic = 'force-dynamic';

export default async function Index() {
  const session = await getServerUserSession();
  let sessionId;
  if (session) {
    sessionId = session.user.id;
  } else {
    // const session = await refreshUserSession();
    // sessionId = session.user.id;
  }

  const response = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'
      ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/company/jobListing/${sessionId}`
      : process.env.NEXT_PRIVATE_URL + `/api/company/jobListing/${sessionId}`,
  );

  const { fetchedCompanyData, fetchedJobPostData } = await response.json();
  const companyData = fetchedCompanyData as CompanyTypes;
  const jobListing = fetchedJobPostData as ListingData[];
  // console.log('hero companyData', companyData);
  // console.log('hero jobListing', jobListing);
  return (
    <div className='w-full items-center justify-center'>
      <Hero jobListing={fetchedJobPostData} companyData={fetchedCompanyData} />
      <Listing />
    </div>
  );
}
