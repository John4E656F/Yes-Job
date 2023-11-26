import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return error;
  }

  // revalidatePath('/');
  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
  // return redirect(
  //   process.env.NEXT_PRIVATE_PRODUCTION === 'true' ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/` : process.env.NEXT_PRIVATE_URL + `/`,
  // );
}
