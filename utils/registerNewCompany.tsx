'use server';
import { createClient } from '@/utils/supabase/server';

interface Company {
  id: string;
  user_name: string;
  user_email: string;
  user_logo: string;
  user_id: string | null;
  contactName: string;
  countryCode: string | null;
  phone: number | null;
  isCompany: boolean;
  user_total_request_count: number;
  created_at: string;
}
interface Result {
  resCompanyId?: string;
  error?: string;
}
export const registerNewCompany = async (
  companyName: string,
  companyEmail: string,
  companyLogo: string | null,
  contactName: string,
  contactPassword: string,
): Promise<Result> => {
  // Try to fetch the company from the database

  const supabase = createClient();
  const { data: companyData, error: companyError } = await supabase.from('users').select('id').eq('user_email', companyEmail).single();

  if (!companyData === null) {
    return { error: 'User data already exist' };
  }
  // If the company does not exist, create a new one
  const { data: userData, error: userError } = await supabase.auth.signUp({
    email: companyEmail,
    password: contactPassword,
  });

  if (userData && userData.user && companyLogo) {
    const { data: newCompanyData, error: newCompanyError } = await supabase
      .from('users')
      .insert({
        user_name: companyName,
        user_email: companyEmail,
        user_logo: companyLogo,
        contactName: contactName,
        isCompany: true,
        user_id: userData.user.id,
      })
      .select();

    if (newCompanyError || !newCompanyData) {
      console.log('Error inserting new company:', newCompanyError ? newCompanyError.message : 'No data returned');
      throw newCompanyError ? newCompanyError.message : 'No data returned';
    }

    return { resCompanyId: (newCompanyData[0] as Company).id };
  } else {
    if (userError) {
      console.log('Error signing up:', userError.message);
      return { error: userError.message };
    }
    return { error: 'Unexpected error' };
  }
};
