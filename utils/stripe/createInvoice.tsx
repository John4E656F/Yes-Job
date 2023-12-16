'use server';
import { CompanyTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface createInvoiceProps {
  companyData: CompanyTypes;
  name: string;
  invoice_url: string;
  invoice_pdf: string;
}
export const createInvoice = async ({ companyData, name, invoice_url, invoice_pdf }: createInvoiceProps) => {
  const supabase = createClient();
  const { data, error: createInvoiceError } = await supabase
    .from('invoices')
    .insert({ company_id: companyData.id, name: name, invoice_url: invoice_url, invoice_pdf: invoice_pdf })
    .select();

  if (createInvoiceError) {
    // console.log('Error adding one post:', createInvoiceError.message);
  } else {
    return { invoiceId: data[0].id as string };
  }
};
