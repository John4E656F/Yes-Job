'use server';
import { CompanyFormInputs } from '@/app/[locale]/dashboard/company/companyFormResolver';
import { createClient } from '@/utils/supabase/server';
import { CompanyTypes } from '@/types';

interface CompanyProps {
  companyData: CompanyFormInputs;
  path?: string;
}
export async function registerNewCompany({ companyData, path }: CompanyProps) {
  const supabase = createClient();
  const { data: insertedCompanyData, error: insertedCompanyDataError } = await supabase.from('company').insert([
    {
      name: companyData.name,
      slug: companyData.slug,
      website: companyData.website,
      logo: companyData.logo,
      about: companyData.about,
      address: companyData.address,
    },
  ]);
}
export async function updateCompany({ companyData, path }: CompanyProps) {
  const supabase = createClient();
  const { data: insertedCompanyData, error: insertedCompanyDataError } = await supabase.from('company').update({
    name: companyData.name,
    slug: companyData.slug,
    website: companyData.website,
    logo: companyData.logo,
    about: companyData.about,
    address: companyData.address,
  });
}
