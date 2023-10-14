import { supabase } from '@/supabase/supabase';
import { generatePassword } from './generatePassword';

interface Company {
  id: string;
  name: string;
  email: string;
  logo: string;
}

export const getOrCreateCompanyId = async (companyName: string, companyEmail: string, companyLogo: string | null, contactName: string) => {
  // Try to fetch the company from the database
  const { data: companyData, error: companyError } = await supabase.from('userd').select('id').eq('user_email', companyEmail).single();

  if (companyError) {
    console.error('Error fetching company:', companyError.message);
    throw companyError;
  }

  // If the company exists, return its ID
  if (companyData) {
    return (companyData as Company).id;
  }

  // If the company does not exist, create a new one
  const { data: userData, error: userError } = await supabase.auth.signUp({
    email: companyEmail,
    password: generatePassword(12),
  });

  if (userError || !userData?.user) {
    console.error('Error creating new user:', userError?.message);
    throw userError || new Error('User data is null');
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
      ownerId: userId,
    })
    .single();

  if (newCompanyError) {
    console.error('Error creating new company:', newCompanyError.message);
    throw newCompanyError;
  }

  // Return the new company's ID
  return (newCompanyData as Company).id;
};
