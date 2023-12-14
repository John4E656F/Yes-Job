'use server';
import { CompanyTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface createInvoiceProps {
  companyData: CompanyTypes;
  name: string;
}
export const createInvoice = async ({ companyData, name }: createInvoiceProps) => {
  const supabase = createClient();
  const { data, error: createInvoiceError } = await supabase.from('invoices').insert({ company_id: companyData.id, name: name }).select();

  if (createInvoiceError) {
    console.log('Error adding one post:', createInvoiceError.message);
  } else {
    return { invoiceId: data[0].id as string };
  }
};
