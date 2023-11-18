'use client';
import React, { useEffect, useState } from 'react';
import { Image, Label, Button, Toast, Tiptap } from '@/components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/supabase/supabase';
import type { ListingData } from '@/types';
import { formatDescription, formatDate } from '@/utils';
import { submitCVFormResolver, type submitCVFormInputs } from './submitCVFormResolver';
import { useForm } from 'react-hook-form';
import { SubmitCVForm } from './submitCVForm';
import { ToastTitle } from '@/types';
import { useTranslations } from 'next-intl';
import { getJobPostById, updateViewCount } from '@/lib/actions';
export default async function annoncePage({ params }: { params: { id: number } }) {
  const t = useTranslations('app');
  const router = useRouter();
  const [jobPost, setJobPost] = useState<ListingData>();
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const fetchJobPostById = async () => {
      try {
        const ownerId = params.id;
        const { data, error } = await getJobPostById({ ownerId });

        if (error) {
          console.error('Error fetching job post:', error.message);
        } else {
          setJobPost(data || null);

          if (!data) {
            router.push('/404');
          } else {
            const { data, error } = await updateViewCount({ itemId: ownerId });
            console.log(data);
          }
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    const updatePageViewCount = async (jobData: ListingData) => {
      try {
        if (jobData && jobData.pageViewCount !== undefined) {
          const { error } = await supabase
            .from('jobPosting')
            .update({ pageViewCount: jobData.pageViewCount + 1 })
            .eq('id', jobData.id);

          if (error) {
            console.log('Error incrementing page view count:', error);
          } else {
            setJobPost({ ...jobData, pageViewCount: jobData.pageViewCount + 1 });
          }
        } else {
          console.log('jobPost or jobPost.pageViewCount is undefined');
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    fetchJobPostById();
  }, [params.id, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<submitCVFormInputs>({
    resolver: submitCVFormResolver,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      cvFile: undefined,
    },
  });

  const onSubmit = async (data: submitCVFormInputs) => {
    try {
      const { name, email, phoneNumber, cvFile } = data;

      if (!jobPost || !jobPost.companyId || !jobPost.companyId.user_email) {
        console.error('Recruiter email is not available');
        return;
      }

      const recruiterEmail = jobPost.companyId.user_email;

      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('phoneNumber', phoneNumber);
      formDataToSend.append('cvFile', cvFile as Blob);
      formDataToSend.append('recruiterEmail', recruiterEmail);

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <header className='w-full flex justify-center py-4 bg-brand-lightbg'>
      {jobPost ? (
        <section className='container flex flex-col gap-4'>
          <div className='flex flex-row items-center md:flex-row md:p-2'>
            <Image
              src={jobPost.companyId?.user_logo as string}
              alt='Yes Job'
              className='w-20 m-5 h-20 md:w-24 md:h-24 object-contain bg-blue-200 rounded-2xl'
              unoptimized
            />
            <div className=''>
              <h6 className='text-base font-semibold md:text-lg'>{jobPost.title}</h6>
              <p className='text-base md:text-lg'>{jobPost.companyId?.user_name}</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
            <Label text={jobPost.location} type='location' />
            {jobPost.salaryMin ? (
              <Label text={`${t('publishAds.from')} € ` + jobPost.salaryMin} type='salary' />
            ) : jobPost.salaryMax ? (
              <Label text={`${t('publishAds.to')} € ` + jobPost.salaryMax} type='salary' />
            ) : null}
            {jobPost.cdd ? <Label text='CDD' type='WorkDuration' /> : null}
            {jobPost.cdi ? <Label text='CDI' type='WorkDuration' /> : null}
            {jobPost.fullTime ? <Label text={t('listing.fullTime')} type='WorkDuration' /> : null}{' '}
            {jobPost.partTime ? <Label text={t('listing.partTime')} type='WorkDuration' /> : null}
            {jobPost.experience ? (
              <Label text={t('listing.experience')} type='noExp' className='block md:hidden lg:block' />
            ) : (
              <Label text={t('listing.noExperience')} type='noExp' className='block md:hidden lg:block' />
            )}
          </div>
          <div className='flex flex-col gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
            <h2 className='text-2xl font-semibold'>{t('adPage.description')}</h2>
            <Tiptap content={jobPost.description} editable={false} />
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <div className='flex flex-col gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
            <h2 className='text-2xl font-semibold'>{t('adPage.apply')}</h2>
            {jobPost.applicationMethod === 'yesJob' ? (
              <SubmitCVForm register={register} handleSubmit={handleSubmit(onSubmit)} errors={errors} showRedirect={false} jobPost={jobPost} t={t} />
            ) : jobPost.applicationMethod === 'externalForm' ? (
              <Link href={jobPost.externalFormURL}>
                <Button btnType='button' text={t('adPage.redirect')} className={`bg-blue-500 text-white px-4 py-2 rounded`} />
              </Link>
            ) : jobPost.applicationMethod === 'both' ? (
              <SubmitCVForm
                register={register}
                handleSubmit={handleSubmit(onSubmit)}
                errors={errors}
                showRedirect={jobPost.applicationMethod === 'both'}
                jobPost={jobPost}
                t={t}
              />
            ) : null}
            <div className='flex gap-5'>
              <p>
                {t('adPage.viewed')} {jobPost.pageViewCount}
              </p>
              <p>
                {t('adPage.publishAt')} {jobPost?.created_at ? formatDate(jobPost.created_at) : 'N/A'}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p> // Display a loading message while jobPost is null
      )}
    </header>
  );
}
