'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import type { ListingData } from '@/types';

interface JobPostProps {
  ownerId: string;
  path?: string;
}

export async function getCurrentUserJobListing({ ownerId, path }: JobPostProps) {
  const supabase = createClient(); // const supabase = createClientComponentClient<Database>();
  try {
    if (!ownerId) {
      return;
    }
    const { data: fetchedCompany, error: companyError } = await supabase.from('company').select('*').eq('owner_id', ownerId).single();
    const { data: fetchedUserListing, error: userError } = await supabase
      .from('jobPosting')
      .select(`*, company(*)`)
      .eq('company_id', fetchedCompany.id);

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    if (path) {
      revalidatePath(path);
    }
    return fetchedUserListing;
  } catch (error: any) {
    return error.message;
  }
}

export async function getJobPostById({ ownerId, path }: JobPostProps) {
  const supabase = createClient();
  try {
    if (!ownerId) {
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
      .eq('id', ownerId)
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
