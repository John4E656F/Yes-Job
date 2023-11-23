'use server';

import { revalidatePath } from 'next/cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import type { ListingData, viewCounterDataType, viewCounterResponseType } from '@/types';
import { cookies } from 'next/headers';

interface viewCountProps {
  itemId: string;
  path?: string;
}

export async function updateViewCount({ itemId, path }: viewCountProps) {
  const cookieStore = cookies();
  const hasViewed = cookieStore.get('viewCount');
  const supabase = createClient();
  console.log(hasViewed);

  if (!hasViewed) {
    try {
      // Update the view count for the specified ownerId
      const { data: newViewCount, error: updateError } = await supabase
        .from('viewCounter')
        .upsert([{ item_id: itemId, viewed_at: new Date(), view_count: 1 }])
        .select();

      if (updateError) {
        return { type: 'error', message: updateError.message };
      }

      const { data: fetchedViewCount, error: fetchError } = await supabase.from('viewCounter').select('*').eq('item_id', itemId);
      // console.log(fetchedViewCount);

      if (fetchError) {
        return { type: 'error', message: fetchError.message };
      }

      let totalViewCount: number = 0;

      if (fetchedViewCount) {
        totalViewCount = fetchedViewCount.reduce((acc, view) => acc + view.view_count, 0);
      }
      // console.log(totalViewCount);
      cookieStore.set('viewCount', itemId);
      const data: viewCounterResponseType = { type: 'success', message: fetchedViewCount as viewCounterDataType[], totalViewCount: totalViewCount };
      return data;
    } catch (error: any) {
      return { type: 'error', message: error.message };
    }
  }
}
