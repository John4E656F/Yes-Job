'use server';
import { type PublishFormInputs } from '@/app/[locale]/(home)/annonce/publier/publishFormResolver';
import { v4 as uuidv4 } from 'uuid';
import { registerNewCompany, removeSpaces } from '@/utils/';
import { createClient } from '@/utils/supabase/server';

export async function publishListing(data: PublishFormInputs) {
  const supabase = createClient();

  let logo = data.logo[0];
  if (logo instanceof File) {
    const filename = `${uuidv4()}-${removeSpaces(data.logo[0].name)}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('logo').upload(filename, data.logo[0], {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) {
        return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
      }
      const { data: publicUrlData } = await supabase.storage.from('logo').getPublicUrl(uploadData.path);
      const publicUrl = publicUrlData.publicUrl;
      logo = publicUrl;
    } catch (uploadError: any) {
      return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
    }
  }
  try {
    let companyId = data.user_Id;

    if (companyId === '') {
      const { resCompanyId, error } = await registerNewCompany(data.companyName, data.contactEmail, logo, data.contactName, data.contactPassword);
      console.log(companyId);

      if (error) {
        return {
          type: 'error' as const,
          message: 'User already exists, please login first',
        };
      } else {
        companyId = resCompanyId;
      }
    }

    const { error: insertError } = await supabase.from('jobPosting').insert({
      companyId: companyId,
      title: data.title,
      jobFunction: data.jobFunction,
      cdd: data.cdd,
      cdi: data.cdi,
      fullTime: data.fullTime,
      partTime: data.partTime,
      description: data.description,
      experience: data.experience === 'experience' ? true : false,
      location: data.location,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      applicationMethod: data.applicationMethod,
      externalFormURL: data.externalFormURL,
      pinned: true,
      pinned_at: new Date().toISOString(),
      published: true,
    });

    if (insertError) {
      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }
    return {
      type: 'success' as const,
      message: 'Your job offer has been published successfully.',
    };
  } catch (error: any) {
    // console.error('An error occurred:', error.message);
    return {
      type: 'error' as const,
      message: 'Unexpected error, please try again later.',
    };
  }
}
