'use server';
import { CompanyTypes, UsersTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface buyJoblistingProps {
  userData: UsersTypes;
  companyData: CompanyTypes;
  amount: number;
}
export const buyJoblisting = async ({ userData, companyData, amount }: buyJoblistingProps) => {
  const supabase = createClient();
  const { data, error: addJobListingError } = await supabase
    .from('company')
    .update({ availableJobListing: companyData.availableJobListing! + amount })
    .eq('owner_id', userData.id);

  if (addJobListingError) {
    console.log('Error adding one post:', addJobListingError.message);
  }
};
