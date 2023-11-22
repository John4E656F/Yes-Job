'use server';
import { createClient } from '@/utils/supabase/server';
import { UsersTypes } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

  try {
    const { data: fetchedUserData, error: userError } = await supabase.from('users').select('*').eq('user_id', ownerId).single();

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    return NextResponse.json({ fetchedUserData: fetchedUserData as UsersTypes });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
