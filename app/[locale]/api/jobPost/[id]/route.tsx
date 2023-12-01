'use server';
import { createClient } from '@/utils/supabase/server';
import { ListingData } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

  try {
    const { data: fetchedJobPostData, error: fetchedJobPostError } = await supabase
      .from('jobPosting')
      .select(
        `
  *,
  companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany ),
  company:company(*)
`,
      )
      .eq('id', params.id)
      .single();

    if (fetchedJobPostError) {
      return NextResponse.json({ fetchedJobPostErrorr: 'Failed to fetch user data ' + fetchedJobPostError.message });
    }

    return NextResponse.json({ fetchedJobPostData: fetchedJobPostData as ListingData });
    // new Response(JSON.stringify(fetchedJobPostData), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
