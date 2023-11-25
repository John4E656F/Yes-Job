'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';

import { createClient } from '@/utils/supabase/server';

interface PromoteProps {
  itemId: string;
  path?: string;
}

export async function promote({ itemId, path }: PromoteProps) {
  const supabase = createClient();

  try {
    const { error: updateError } = await supabase.from('jobPosting').update({ promoted: true, promoted_at: new Date() }).eq('id', itemId);

    if (updateError) {
      return { type: 'error' as const, message: updateError.message };
    }
    revalidatePath(path!);
    return { type: 'success' as const, message: 'Promoted successfully' };
  } catch (error: any) {
    return { type: 'error' as const, message: error.message };
  }
}
