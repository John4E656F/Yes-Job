import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

export async function getClientUserSession() {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    const { data, error } = await supabase.auth.refreshSession();
    const { session, user } = data;
    if (!session) {
      redirect('/login');
    } else {
      return session;
    }
  } else {
    return session;
  }
}
