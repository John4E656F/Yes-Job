'use server';
import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { UsersTypes, ListingData, viewCounterDataType, dashboardViewCounterDisplayType } from '@/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const itemId = params.id;

  try {
    // Fetch user data
    const { data: fetchedUserData, error: userError } = await supabase.from('users').select('*').eq('user_id', itemId).single();

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    const userData = fetchedUserData as UsersTypes;

    // Fetch job listing data
    const { data: fetchedJobPostData, error: jobError } = await supabase
      .from('jobPosting')
      .select(
        `
*,
companyId:users (*) 
`,
      )
      .eq('id', itemId);

    if (jobError) {
      throw new Error('Failed to fetch job listing data: ' + jobError.message);
    }

    return NextResponse.json({
      fetchedUserData: fetchedUserData as UsersTypes,
      fetchedJobPostData: fetchedJobPostData as ListingData[],
    });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
