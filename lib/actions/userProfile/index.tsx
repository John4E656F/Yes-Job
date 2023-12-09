'use server';
import { InfoFormInputs } from '@/app/[locale]/dashboard/settings/info/infoFormResolver';
import { createClient } from '@/utils/supabase/server';
import { CompanyTypes } from '@/types';
import { revalidatePath } from 'next/cache';

interface UserProps {
  userData: InfoFormInputs;
  profilePictureUrl: string;
  path?: string;
}

export async function updateUser({ userData, profilePictureUrl, path }: UserProps) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({ email: userData.user_email });
  if (error) {
    return { type: 'error' as const, message: error.message };
  } else {
    const { data: insertedUserData, error: insertedUserDataError } = await supabase
      .from('users')
      .update({
        firstname: userData.firstname,
        lastname: userData.lastname,
        user_email: userData.user_email,
        user_phone: userData.user_phone,
        profile_picture: profilePictureUrl,
      })
      .eq('id', userData.user_id);

    if (insertedUserDataError) {
      return { type: 'error' as const, message: insertedUserDataError.message };
    } else {
      //   console.log('data', data);

      revalidatePath(path!);
      return { type: 'success' as const, message: 'Company has been updated successfully' };
    }
  }
}
