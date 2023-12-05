'use  server';

import { createClient } from '@/utils/supabase/server';
import { UsersTypes, CompanyTypes, ListingData } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

  try {
    const { data: fetchedUserData, error: fecthedUserDataError } = await supabase.from('users').select('*').eq('user_id', ownerId).single();

    if (fecthedUserDataError) {
      return NextResponse.json({ fetchedCompanyError: 'Failed to fetch user data: ' + fecthedUserDataError.message });
    }

    const { data: fetchedCompanyData, error: fetchedCompanyError } = await supabase
      .from('company')
      .select('*')
      .eq('owner_id', fetchedUserData.id)
      .single();

    if (fetchedCompanyError) {
      return NextResponse.json({ fetchedCompanyError: 'Failed to fetch user data: ' + fetchedCompanyError.message });
    }
    const { data: fetchedJobPostData, error: fetchedJobPostError } = await supabase
      .from('jobPosting')
      .select('*')
      .eq('company_id', fetchedCompanyData.id);

    if (fetchedJobPostError) {
      return NextResponse.json({ fetchedJobPostError: 'Failed to fetch user data ' + fetchedJobPostError.message });
    }
    return NextResponse.json({
      fetchedUserData: fetchedUserData as UsersTypes,
      fetchedCompanyData: fetchedCompanyData as CompanyTypes,
      fetchedJobPostData: fetchedJobPostData as ListingData[],
    });
  } catch (error: any) {
    return NextResponse.json({ fetchedCompanyError: error.message });
  }
}
