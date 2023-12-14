'use server';
import { CompanyTypes, UsersTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface subscribeRebillProps {
  userData: UsersTypes;
  companyData: CompanyTypes;
  boostAmount?: number;
  plan: string;
  amount: number;
}
export const subscribeRebill = async ({ userData, companyData, amount, boostAmount, plan }: subscribeRebillProps) => {
  const supabase = createClient();
  if (boostAmount) {
    const { data, error: subscribeError } = await supabase
      .from('company')
      .update({ availableJobListing: companyData.availableJobListing! + amount, boost: boostAmount, subscription: plan, srebilled_at: new Date() })
      .eq('owner_id', userData.id);
    if (subscribeError) {
      console.log('Error adding one post:', subscribeError.message);
    }
  } else {
    const { data, error: subscribeError } = await supabase
      .from('company')
      .update({ availableJobListing: companyData.availableJobListing! + amount, subscription: plan, rebilled_at: new Date() })
      .eq('owner_id', userData.id);
    if (subscribeError) {
      console.log('Error adding one post:', subscribeError.message);
    }
  }
};
