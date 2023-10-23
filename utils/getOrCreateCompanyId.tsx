import { supabase } from '@/supabase/supabase';
import { generatePassword } from './generatePassword';

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
  companyId?: string;
  error?: string;
}

export const getOrCreateCompanyId = async (
  companyName: string,
  companyEmail: string,
  companyLogo: string | null,
  contactName: string,
  contactPassword: string,
): Promise<Result> => {
  // If the company does not exist, create a new user
  const { data: userData, error: userError } = await supabase.auth.signUp({
    email: companyEmail,
    password: contactPassword,
  });

  if (userError || !userData?.user) {
    console.error('Error creating new user:', userError?.message);
    return { error: userError?.message || 'User data is null' };
  }

  const userId = userData.user.id;

  // Insert a new company with a user_id referencing the newly created user
  const { data: newCompanyData, error: newCompanyError } = await supabase
    .from('users')
    .insert({
      user_name: companyName,
      user_email: companyEmail,
      user_logo: companyLogo,
      contactName: contactName,
      isCompany: true,
      user_id: userId,
    })
    .single();

  if (newCompanyError) {
    console.error('Error creating new company:', newCompanyError.message);
    return { error: newCompanyError.message };
  } else {
    return { companyId: (newCompanyData as Company).id };
  }
};
