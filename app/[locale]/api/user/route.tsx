import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { getServerUserSession } from '@/lib/actions/getServerUserSession';

export async function GET() {
  const session = await getServerUserSession();

  if (!session) {
    return NextResponse.json({ message: 'No session found' });
  }

  const ownerId = session.user.id;
  const supabase = createClient();
  try {
    const { data: fetchedUserData, error: userError } = await supabase.from('users').select('*').eq('user_id', ownerId).single();

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    return NextResponse.json({ fetchedUserData });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
