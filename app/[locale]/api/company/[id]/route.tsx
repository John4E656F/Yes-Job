'use server';
import { createClient } from '@/utils/supabase/server';
import { CompanyTypes } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

  try {
    const { data: fetchedCompanyData, error: fetchedCompanyError } = await supabase
      .from('company')
      .select('*')
      .eq('owner_id' || 'teamMembers', ownerId)
      .single();

    if (fetchedCompanyError) {
      return NextResponse.json({ fetchedCompanyError: 'Failed to fetch user data: ' + fetchedCompanyError.message });
    }

    return NextResponse.json({ fetchedCompanyData: fetchedCompanyData as CompanyTypes });
  } catch (error: any) {
    return NextResponse.json({ fetchedCompanyError: error.message });
  }
}
