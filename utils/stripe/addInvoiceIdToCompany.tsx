'use server';
import { CompanyTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface addInvoiceIdToCompanyProps {
  companyData: CompanyTypes;
  invoice_id: string;
}
export const addInvoiceIdToCompany = async ({ companyData, invoice_id }: addInvoiceIdToCompanyProps) => {
  const supabase = createClient();
  const { error: addInvoiceIdToCompanyError } = await supabase
    .from('company')
    .update({ invoices: [invoice_id] })
    .eq('company_id', companyData.id);

  if (addInvoiceIdToCompanyError) {
    console.log('Error adding one post:', addInvoiceIdToCompanyError.message);
  }
};
