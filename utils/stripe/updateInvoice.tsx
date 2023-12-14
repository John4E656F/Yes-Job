'use server';
import { CompanyTypes } from '@/types';
import { createClient } from '@/utils/supabase/server';

interface updateInvoiceProps {
  companyData: CompanyTypes;
  invoice_url: string;
  invoice_pdf: string;
  invoice_id: string;
}
export const updateInvoice = async ({ companyData, invoice_url, invoice_pdf, invoice_id }: updateInvoiceProps) => {
  const supabase = createClient();
  const { error: updateError } = await supabase
    .from('invoices')
    .update({ invoice_url: invoice_url, invoice_pdf: invoice_pdf })
    .eq('company_id', companyData.id);

  if (updateError) {
    console.log('Error adding one post:', updateError.message);
  }
};
