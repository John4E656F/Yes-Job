'use server';
import { createClient } from '@/utils/supabase/server';

interface Company {
  id: string;
  owner_id: string;
  teamMembers: string;
  jobListings: string;
  name: string;
  logo: string;
  website: string | null;
  phone: number | null;
  isCompany: boolean;
  user_total_request_count: number;
  created_at: string;
}

interface User {
  id: string;
  user_name: string;
  user_email: string;
  user_logo: string;
  user_id: string | null;
  contactName: string;
  countryCode: string | null;
  phone: number | null;
  isCompany: boolean;
  created_at: string;
}

interface Result {
  resUserId?: string;
  resCompanyId?: string;
  error?: string;
}
export const registerNewCompany = async (
  companyName: string,
  companyEmail: string,
  companyLogo: string,
  companyWebsite: string | undefined,
  companyPhone: string | null,
  contactEmail: string,
  contactName: string,
  contactPhone: string | null,
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
    email: contactEmail,
    password: contactPassword,
  });

  if (userData && userData.user && companyLogo) {
    const { data: newUserData, error: newUserError } = await supabase
      .from('users')
      .insert({
        user_name: companyName,
        user_email: contactEmail,
        user_logo: companyLogo,
        contactName: contactName,
        user_phone: contactPhone,
        user_id: userData.user.id,
      })
      .select('*');

    if (newUserError || !newUserData) {
      // console.log('Error inserting new user:', newUserError ? newUserError.message : 'No data returned');
      return { error: newUserError.message };
    }
    // console.log('New user inserted:', newUserData[0]);

    const { data: newCompanyData, error: newCompanyError } = await supabase
      .from('company')
      .insert({
        owner_id: newUserData[0].id,
        teamMembers: [newUserData[0].id],
        name: companyName,
        logo: companyLogo,
        website: companyWebsite,
        phone: companyPhone,
      })
      .select('*');

    if (newCompanyError || !newCompanyData) {
      // console.log('Error inserting new company:', newCompanyError ? newCompanyError.message : 'No data returned');
      return { error: newCompanyError.message };
    }

    return { resUserId: newUserData[0].id, resCompanyId: newCompanyData[0].id };
  } else {
    if (userError) {
      // console.log('Error signing up:', userError.message);
      return { error: userError.message };
    }
    return { error: 'Unexpected error' };
  }
};
