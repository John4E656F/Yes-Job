'use server';
import { type EditFormInputs } from '@/app/[locale]/dashboard/job-listing/edit/[id]/editFormResolver';
import { type PublishFormInputs } from '@/app/[locale]/(home)/publier/publishFormResolver';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

interface EditListingProps {
  data: EditFormInputs;
  path?: string;
}

interface NewListingProps {
  data: PublishFormInputs;
  path?: string;
}

export async function updateListing({ data, path }: EditListingProps) {
  const supabase = createClient();

  try {
    const { error: insertError } = await supabase
      .from('jobPosting')
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', data.id);

    if (insertError) {
      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }
    revalidatePath(path!);
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

export async function publishDraftListing({ data, path }: EditListingProps) {
  const supabase = createClient();

  try {
    const { error: insertError } = await supabase
      .from('jobPosting')
      .update({
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
        published_at: new Date().toISOString(),
      })
      .eq('id', data.id);

    if (insertError) {
      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }
    revalidatePath(path!);
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

export async function saveListingAsDraft({ data, path }: EditListingProps) {
  const supabase = createClient();

  try {
    const { error: insertError } = await supabase
      .from('jobPosting')
      .update({
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
      })
      .eq('id', data.id);

    if (insertError) {
      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }

    revalidatePath(path!);
    return {
      type: 'success' as const,
      message: 'Your job offer has been successfully saved as draft.',
    };
  } catch (error: any) {
    // console.error('An error occurred:', error.message);
    return {
      type: 'error' as const,
      message: 'Unexpected error, please try again later.',
    };
  }
}

export async function saveNewListingAsDraft({ data, path }: NewListingProps) {
  const supabase = createClient();

  try {
    const { error: insertError } = await supabase.from('jobPosting').insert({
      companyId: data.user_Id,
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
    });

    if (insertError) {
      console.log(insertError);

      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }

    revalidatePath(path!);
    return {
      type: 'success' as const,
      message: 'Your job offer has been successfully saved as draft.',
    };
  } catch (error: any) {
    console.error('An error occurred:', error.message);
    return {
      type: 'error' as const,
      message: 'Unexpected error, please try again later.',
    };
  }
}

export async function republishListing({ data, path }: EditListingProps) {
  const supabase = createClient();

  try {
    const { error: insertError } = await supabase
      .from('jobPosting')
      .update({
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
        published_at: new Date().toISOString(),
        updated_at: null,
        republished_at: new Date().toISOString(),
        expired: false,
      })
      .eq('id', data.id);

    if (insertError) {
      return {
        type: 'error' as const,
        message: 'Unexpected error, please try again later.',
      };
    }
    revalidatePath(path!);
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
