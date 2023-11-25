import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function refreshUserSession() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.refreshSession();
  const { session, user } = data;
  if (!session) {
    redirect('/');
  } else {
    return session;
  }
}
