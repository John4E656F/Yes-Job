import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { CompanyTypes } from '@/types';
import { getTranslations } from 'next-intl/server';

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const t = await getTranslations('app');
  const supabase = createClient();
  const companyId = params.id;
  console.log(companyId);

  const { data: fetchedCompanyData, error: fetchedCompanyError } = await supabase.from('company').select('*').eq('id', companyId).single();

  console.log(fetchedCompanyData);

  if (fetchedCompanyError) {
    //   return { fetchedCompanyError: 'Failed to fetch user data: ' + fetchedCompanyError.message });
  }
  //   const { fetchedCompanyData } = await response.json();
  //   const companyData: CompanyTypes = fetchedCompanyData;

  //   console.log(companyData);

  return (
    <section>
      <div>Hello World</div>
    </section>
  );
}
