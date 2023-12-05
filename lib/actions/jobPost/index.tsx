'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import type { ListingData } from '@/types';

interface JobPostProps {
  company_Id: string;
  path?: string;
}

export async function getCurrentUserJobListing({ company_Id, path }: JobPostProps) {
  const supabase = createClient(); // const supabase = createClientComponentClient<Database>();
  try {
    if (!company_Id) {
      return { type: 'error' as const, message: 'No company id provided' };
    }

    const { data: fetchedUserListing, error: userError } = await supabase.from('jobPosting').select(`*, company(*)`).eq('company_id', company_Id);

    if (userError) {
      console.log('userError', userError.message);

      return { type: 'error' as const, message: userError.message };
    }

    if (path) {
      revalidatePath(path);
    }
    return fetchedUserListing;
  } catch (error: any) {
    return error.message;
  }
}

//UNUSED
export async function getJobPostById({ company_Id, path }: JobPostProps) {
  const supabase = createClient();
  try {
    if (!company_Id) {
      return;
    }

    const { data: fetchedJobPost, error: fetchedJobPostError } = await supabase
      .from('jobPosting')
      .select(
        `
      *,
      companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany ) 
    `,
      )
      .eq('company_id', company_Id)
      .single();
    if (fetchedJobPostError) {
      throw new Error('Failed to fetch user data: ' + fetchedJobPostError.message);
    }

    if (path) {
      revalidatePath(path);
    }
    return fetchedJobPost;
  } catch (error: any) {
    return error.message;
  }
}
