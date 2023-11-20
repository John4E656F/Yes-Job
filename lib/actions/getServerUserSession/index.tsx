import { createClient } from '@/utils/supabase/server';

export async function getServerUserSession() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
