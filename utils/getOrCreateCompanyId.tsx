import { supabase } from '@/supabase/supabase';

interface Company {
  id: string;
  name: string;
  email: string;
  logo: string;
}

export const getOrCreateCompanyId = async (companyName: string, companyEmail: string, companyLogo: string | null, contactName: string) => {
  // Try to fetch the company from the database
  const { data: companyData, error: companyError } = await supabase.from('company').select('id').eq('email', companyEmail).single();

  if (companyError) {
    console.error('Error fetching company:', companyError.message);
    throw companyError;
  }

  // If the company exists, return its ID
  if (companyData) {
    return (companyData as Company).id;
  }

  // If the company does not exist, create a new one
  const { data: newCompanyData, error: newCompanyError } = await supabase
    .from('companies')
    .insert({
      companyName: companyName,
      companyEmail: companyEmail,
      companyLogo: companyLogo,
      contactName: contactName,
    })
    .single();

  if (newCompanyError) {
    console.error('Error creating new company:', newCompanyError.message);
    throw newCompanyError;
  }

  // Return the new company's ID
  return (newCompanyData as Company).id;
};
