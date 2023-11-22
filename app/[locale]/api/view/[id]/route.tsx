'use server';

import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { ListingData, viewCounterDataType, viewCounterResponseType } from '@/types';
import { cookies } from 'next/headers';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const itemId = params.id;
  const cookieStore = cookies();
  const hasViewed = cookies().get('viewCount');
  const supabase = createClient();
  console.log(hasViewed);

  try {
    if (!hasViewed) {
      // Update the view count for the specified ownerId
      const { data: newViewCount, error: updateError } = await supabase
        .from('viewCounter')
        .upsert([{ item_id: itemId, viewed_at: new Date(), view_count: 1 }])
        .select();

      //   if (updateError) {
      //     return Response.json({ type: 'error', message: updateError.message });
      //   }

      const { data: fetchedViewCount, error: fetchError } = await supabase.from('viewCounter').select('*').eq('item_id', itemId);
      // console.log(fetchedViewCount);

      //   if (fetchError) {
      //     return Response.json({ type: 'error', message: fetchError.message });
      //   }

      let totalViewCount: number = 0;

      if (fetchedViewCount) {
        totalViewCount = fetchedViewCount.reduce((acc, view) => acc + view.view_count, 0);
      }
      // console.log(totalViewCount);
      //   cookieStore.set('viewCount', itemId, {
      //     maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      //     secure: true,
      //     httpOnly: true,
      //   });

      cookieStore.set('viewCount', itemId, {
        path: '/',
        domain: 'localhost',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
        secure: false,
      });

      const viewCounterdata = NextResponse.json(
        {
          type: 'success',
          message: fetchedViewCount as viewCounterDataType[],
          totalViewCount: totalViewCount,
        },
        { status: 200, statusText: 'Set cookie successfully' },
      );

      let responseBody = NextResponse.json({ totalViewCount });
      responseBody.cookies.set('viewCount', itemId, {
        maxAge: 30 * 24 * 60 * 60,
        sameSite: 'strict',
        path: '/',
      });
      //   console.log(responseBody);

      return responseBody;
      // return NextResponse.json({ totalViewCount }, {
      //     headers: {
      //       'Set-Cookie': cookieStore.toString(),
      //     },
      // })
    }
  } catch (error: any) {
    return NextResponse.json({ type: 'error', message: error.message });
  }
}
