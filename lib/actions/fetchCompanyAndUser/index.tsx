'use server';
import { CompanyTypes, UsersTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface Result {
  fetchedCompanyData: CompanyTypes;
  fetchedUserById: UsersTypes;
}
export const fetchCompanyAndUser = async ({ userId }: { userId: string }): Promise<Result> => {
  const supabase = createClient();
  const { data: fetchedCompanyData, error: fetchedCompanyDataError } = await supabase.from('company').select('*').eq('owner_id', userId).single();
  const { data: fetchedUserById, error: fetchedUserByIdError } = await supabase.from('users').select('*').eq('id', userId).single();
  if (fetchedCompanyDataError || fetchedUserByIdError) {
    // console.log('Error fetching company and user:', fetchedCompanyDataError?.message || fetchedUserByIdError?.message);
  }
  return { fetchedCompanyData, fetchedUserById };
};
