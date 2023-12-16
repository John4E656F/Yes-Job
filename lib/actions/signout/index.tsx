import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: 'global' });

  if (error) {
    // console.log(error);
    // Handle the error appropriately
    return new Response('Error signing out', { status: 500 });
  }
}
