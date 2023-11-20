'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types';

interface currentUserProps {
  ownerId: string;
  path?: string;
}
export async function getCurrentUser({ ownerId, path }: currentUserProps) {
  const supabase = createClient();
  try {
    if (!ownerId) {
      return;
    }

    const { data: fetchedUserData, error: userError } = await supabase.auth.getUser();

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
