'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabase/supabase';
import type { ListingData } from '@/types';

interface viewCountProps {
  itemId: Number;
  path?: string;
}
export async function updateViewCount({ itemId, path }: viewCountProps) {
  try {
    if (!itemId) {
      return;
    }
    const { data: fetchedViewCount, error: fetchError } = await supabase.from('view_counts').select('view_count').eq('item_id', itemId);

    if (fetchError) {
      throw new Error('Failed to fetch view count: ' + fetchError.message);
    }

    let updatedViewCount = fetchedViewCount?.[0]?.view_count ?? 0;
    updatedViewCount++;

    // Update the view count for the specified ownerId
    const { data: newViewCount, error: updateError } = await supabase
      .from('view_counts')
      .upsert([{ item_id: itemId, viewed_at: new Date(), view_count: updatedViewCount }])
      .select();
    console.log(newViewCount);

    if (updateError) {
      throw new Error('Failed to update view count: ' + updateError.message);
    }
    return newViewCount;
  } catch (error: any) {
    return error.message;
  }
}
