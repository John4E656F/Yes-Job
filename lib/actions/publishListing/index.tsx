'use server';
import { type FirstPublishFormInputs } from '@/app/[locale]/(home)/annonce/publier/firstPublishFormResolver';
import { type PublishFormInputs } from '@/app/[locale]/(home)/publier/publishFormResolver';
import { v4 as uuidv4 } from 'uuid';
import { registerNewCompany, removeSpaces } from '@/utils/';
import { createClient } from '@/utils/supabase/server';

interface jobPost {
  id: string;
}

interface FirstPublishProps {
  data: FirstPublishFormInputs;
  logoUrl: string;
}
export async function publishFirstListing({ data, logoUrl }: FirstPublishProps) {
  // console.log(data);

  const supabase = createClient();

  try {
    const { resUserId, resCompanyId, error } = await registerNewCompany(
      data.companyName,
      data.contactEmail,
      logoUrl,
      data.companyWebsite || '',
      data.companyPhone,
      data.contactEmail,
      data.contactName,
      data.contactPhone,
      data.contactPassword,
    );

    if (error) {
      return {
        type: 'error' as const,
        message: error,
      };
    }

    const { data: jobPostData, error: jobPostError } = await supabase
      .from('jobPosting')
      .insert({
        company_id: resCompanyId,
        title: data.title,
        jobFunction: data.jobFunction,
        cdd: data.cdd,
        cdi: data.cdi,
        fullTime: data.fullTime,
        partTime: data.partTime,
        description: data.description,
        experience: data.experience === 'experience' ? true : false,
        student: data.student,
        flexi: data.flexi,
        location: data.location,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        applicationMethod: data.applicationMethod,
        externalFormURL: data.externalFormURL,
        pinned: true,
        pinned_at: new Date().toISOString(),
        published: true,
      })
      .select();

    if (jobPostError || !jobPostData) {
      // console.log(jobPostError);

      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }
    // console.log('jobPostData', jobPostData);

    const { data: languageData, error: languageError } = await supabase
      .from('languages')
      .insert({ english: data.english, french: data.french, dutch: data.dutch, jobPost_id: jobPostData[0].id })
      .select('*');

    if (languageError || !languageData) {
      // console.log('language', languageError.message);

      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }

    const { error: companyError } = await supabase
      .from('company')
      .update({ jobListings: [jobPostData[0].id] })
      .eq('id', resCompanyId)
      .select('*');

    if (companyError) {
      // console.log('companyerror', companyError.message);
      return { type: 'error' as const, message: companyError.message };
    }

    const { error: newJobPostError } = await supabase.from('jobPosting').update({ languages: languageData[0].id }).eq('id', jobPostData[0].id);

    if (newJobPostError) {
      console.log('add lang:', newJobPostError.message);

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

export async function publishListing(data: PublishFormInputs) {
  const supabase = createClient();

  try {
    let companyId = data.user_Id;

    const { data: jobPostData, error: insertError } = await supabase.from('jobPosting').insert({
      company_id: companyId,
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

    if (insertError || !jobPostData) {
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
