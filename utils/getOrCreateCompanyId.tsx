import { supabase } from '@/supabase/supabase';
import { generatePassword } from './generatePassword';

interface Company {
  id: string;
  name: string;
  email: string;
  password: string;
  logo: string;
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
  // Try to fetch the company from the database
  const { data: companyData, error: companyError } = await supabase.from('users').select('id').eq('user_email', companyEmail);

  if (companyError) {
    console.error('Error fetching company:', companyError.message);
    return { error: companyError.message };
  }

  // If the company exists, return an error
  if (companyData && companyData.length > 0) {
    return { error: 'Company already exists' };
  }

  // If the company does not exist, create a new one
  const { data: userData, error: userError } = await supabase.auth.signUp({
    email: companyEmail,
    password: contactPassword,
  });

  if (userError || !userData?.user) {
    console.error('Error creating new user:', userError?.message);
    return { error: userError?.message || 'User data is null' };
  }

  const userId = userData.user.id; // Access the id here

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
  }

  // Return the new company's ID
  return { companyId: (newCompanyData as Company).id };
};
