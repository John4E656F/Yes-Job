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
      user_email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      isCompany: data.isCompany === 'true' ? true : false,
      user_id: signedUpUser.user.id,
    })
    .select('*');

  if (createdUserError || !createdUser) {
    console.log(createdUserError);

    return { type: 'error', message: 'Error creating user, please try again later!' };
  }

  return { type: 'success', message: 'User created' };
}
