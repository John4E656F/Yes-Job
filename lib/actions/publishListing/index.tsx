'use server';
import { type FirstPublishFormInputs } from '@/app/[locale]/(home)/annonce/publier/firstPublishFormResolver';
import { type PublishFormInputs } from '@/app/[locale]/(home)/publier/publishFormResolver';
import { v4 as uuidv4 } from 'uuid';
import { registerNewCompany, removeSpaces } from '@/utils/';
import { createClient } from '@/utils/supabase/server';

interface jobPost {
  id: string;
}
export async function publishFirstListing(data: FirstPublishFormInputs) {
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
      const { resUserId, resCompanyId, error } = await registerNewCompany(
        data.companyName,
        data.contactEmail,
        logo,
        data.companyWebsite,
        data.companyPhone,
        data.contactName,
        data.contactPassword,
      );

      if (error) {
        return {
          type: 'error' as const,
          message: 'User already exists, please login first',
        };
      } else {
        companyId = resCompanyId;
      }
    }
    const { data: jobPostData, error: jobPostError } = await supabase.from('jobPosting').insert({
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

    if (jobPostError || !jobPostData) {
      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }

    const { error: languageError } = await supabase
      .from('language')
      .insert({ english: data.english, french: data.french, dutch: data.dutch, jobPost_id: (jobPostData[0] as jobPost).id });

    const { error: companyError } = await supabase
      .from('company')
      .update({ jobListings: [(jobPostData[0] as jobPost).id] })
      .eq('id', companyId)
      .single();
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

export async function publishListing(data: PublishFormInputs) {
  const supabase = createClient();

  try {
    let companyId = data.user_Id;

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
