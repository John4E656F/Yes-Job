'use server';
import { CompanyFormInputs } from '@/app/[locale]/dashboard/company/companyFormResolver';
import { createClient } from '@/utils/supabase/server';
import { CompanyTypes } from '@/types';
import { revalidatePath } from 'next/cache';

interface CompanyProps {
  companyData: CompanyFormInputs;
  logoUrl: string;
  path?: string;
}
export async function registerNewCompany({ companyData, logoUrl, path }: CompanyProps) {
  const supabase = createClient();
  const { data: insertedCompanyData, error: insertedCompanyDataError } = await supabase.from('company').insert([
    {
      owner_id: companyData.owner_id,
      teamMembers: [companyData.owner_id],
      name: companyData.name,
      slug: companyData.slug,
      website: companyData.website,
      logo: logoUrl,
      about: companyData.about,
      address: companyData.address,
    },
  ]);
  if (insertedCompanyDataError) {
    return { type: 'error' as const, message: insertedCompanyDataError.message };
  } else {
    revalidatePath(path!);
    return { type: 'success' as const, message: 'Company has been created successfully' };
  }
}
export async function updateCompany({ companyData, logoUrl, path }: CompanyProps) {
  const supabase = createClient();
  const { data: insertedCompanyData, error: insertedCompanyDataError } = await supabase
    .from('company')
    .update({
      name: companyData.name,
      slug: companyData.slug,
      website: companyData.website,
      logo: logoUrl,
      about: companyData.about,
      address: companyData.address,
    })
    .eq('owner_id', companyData.owner_id);

  if (insertedCompanyDataError) {
    return { type: 'error' as const, message: insertedCompanyDataError.message };
  } else {
    revalidatePath(path!);
    return { type: 'success' as const, message: 'Company has been updated successfully' };
  }
}
