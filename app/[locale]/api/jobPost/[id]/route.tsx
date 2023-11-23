'use server';
import { createClient } from '@/utils/supabase/server';
import { ListingData } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;
  console.log(params.id);

  try {
    const { data: fetchedJobPostData, error: userError } = await supabase
      .from('jobPosting')
      .select(
        `
  *,
  companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany ) 
`,
      )
      .eq('id', params.id)
      .single();
    console.log(userError);

    // if (userError) {
    //   return Response.json({ 'Failed to fetch user data ': userError.message });
    // }

    return NextResponse.json({ fetchedJobPostData: fetchedJobPostData as ListingData });
    // new Response(JSON.stringify(fetchedJobPostData), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
