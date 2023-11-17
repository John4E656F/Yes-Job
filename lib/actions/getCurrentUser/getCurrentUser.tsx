'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types';

export async function getCurrentUser(ownerId: string) {
  const supabase = createClientComponentClient<Database>();
  try {
    console.log(ownerId);

    if (!ownerId) {
      return;
    }

    const { data: fetchedUserData, error: userError } = await supabase.from('users').select('*').eq('user_id', ownerId).single();

    if (userError) {
      throw new Error('Failed to fetch user data');
    }

    return fetchedUserData;
  } catch (error: any) {
    return error.message;
  }
}
