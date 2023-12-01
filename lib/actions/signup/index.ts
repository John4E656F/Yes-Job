'use server';
import { SignupFormInputs } from '@/app/[locale]/(home)/signup/signupFormResolver';
import { createClient } from '@/utils/supabase/server';
export async function signup({ data }: { data: SignupFormInputs }) {
  const supabase = createClient();

  const { data: signedUpUser, error: signedUpUserError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signedUpUserError || !signedUpUser.user) {
    if (signedUpUserError?.message === 'User already registered') {
      return { type: 'error', message: 'User already registered' };
    }
    return { type: 'error', message: 'Error signing up user' };
  }

  const { data: createdUser, error: createdUserError } = await supabase
    .from('users')
    .insert({
      user_name: data.name,
      user_email: data.email,
      contactName: data.name,
      isCompany: data.isCompany === 'true' ? true : false,
      user_id: signedUpUser.user.id,
    })
    .select('*');

  if (createdUserError || !createdUser) {
    return { type: 'error', message: 'Error creating user, please try again later!' };
  }

  return { type: 'success', message: 'User created' };
}
