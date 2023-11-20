import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  try {
    const { data: fetchedUserData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error('Failed to fetch user data: ' + userError.message);
    }

    return Response.json({ fetchedUserData });
  } catch (error: any) {
    return error.message;
  }
}
