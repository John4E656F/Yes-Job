'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabase/supabase';
import type { ListingData } from '@/types';

interface currentUserProps {
  ownerId: Number;
  path?: string;
}
export async function getCurrentUserJobListing({ ownerId, path }: currentUserProps) {
  // const supabase = createClientComponentClient<Database>();
  try {
    if (!ownerId) {
      return;
    }
    const { data: fetchedUserData, error: userError } = await supabase.from('jobPosting').select(`*`).eq('companyId', ownerId);

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    if (path) {
      revalidatePath(path);
    }
    return fetchedUserData;
  } catch (error: any) {
    return error.message;
  }
}
