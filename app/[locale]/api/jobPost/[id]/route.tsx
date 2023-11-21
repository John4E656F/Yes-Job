'use server';
import { createClient } from '@/utils/supabase/server';
import { ListingData } from '@/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

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

    if (userError) {
      return Response.json({ 'Failed to fetch user data ': userError.message });
    }

    return Response.json({ fetchedJobPostData: fetchedJobPostData as ListingData });
  } catch (error: any) {
    return Response.json(error.message);
  }
}
