'use server';
import { createClient } from '@/utils/supabase/server';
import { UsersTypes } from '@/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

  try {
    const { data: fetchedUserData, error: userError } = await supabase.from('users').select('*').eq('user_id', ownerId).single();

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    return Response.json({ fetchedUserData: fetchedUserData as UsersTypes });
  } catch (error: any) {
    return Response.json(error.message);
  }
}
