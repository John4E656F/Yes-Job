'use server';
import { CompanyTypes, UsersTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface buyJoblistingProps {
  userData: UsersTypes;
  companyData: CompanyTypes;
  amount: number;
  customer_id?: string | null;
}
export const buyJoblisting = async ({ userData, companyData, amount, customer_id }: buyJoblistingProps) => {
  const supabase = createClient();
  if (companyData.stripe_customer_id) {
    const { data, error: addJobListingError } = await supabase
      .from('company')
      .update({ availableJobListing: companyData.availableJobListing! + amount })
      .eq('owner_id', userData.id);

    if (addJobListingError) {
      console.log('Error adding one post:', addJobListingError.message);
    }
  } else {
    const { data, error: addJobListingError } = await supabase
      .from('company')
      .update({ availableJobListing: companyData.availableJobListing! + amount, stripe_customer_id: customer_id })
      .eq('owner_id', userData.id);

    if (addJobListingError) {
      console.log('Error adding one post:', addJobListingError.message);
    }
  }
};
