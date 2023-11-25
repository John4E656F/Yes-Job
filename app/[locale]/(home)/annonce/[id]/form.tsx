'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { submitCVFormResolver, type submitCVFormInputs } from './submitCVFormResolver';
import type { ListingData, TranslationProps, viewCounterResponseType } from '@/types';
import { ToastTitle } from '@/types';
import { SubmitCVForm } from './submitCVForm';
import { Link, Button, Toast } from '@/components';


export const ContactForm = ({ jobPost }: { jobPost: ListingData }) => {
  const t = useTranslations('app');

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

  // useEffect(() => {
  //   const setViewCount = async () => {
  //     const viewCounterResponse = await fetch(
  //       process.env.NEXT_PRIVATE_PRODUCTION === 'true'
  //         ? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/view/${jobPost.id}`
  //         : process.env.NEXT_PRIVATE_URL + `/api/view/${jobPost.id}`,
  //       { method: 'PUT', credentials: 'include' },
  //     );
  //     console.log(viewCounterResponse);

  //     // const { totalViewCount } = await viewCounterResponse.json();
  //   };
  //   setViewCount();
  // });

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
    <div className='flex flex-col justify-center gap-2.5 py-4 md:justify-start md:py-1'>
      <h2 className='text-2xl font-semibold'>{t('adPage.apply')}</h2>
      {jobPost.applicationMethod === 'yesJob' ? (
        <SubmitCVForm register={register} handleSubmit={handleSubmit(onSubmit)} errors={errors} showRedirect={false} jobPost={jobPost} t={t} />
      ) : jobPost.applicationMethod === 'externalForm' ? (
        <Link href={jobPost.externalFormURL}>
          <Button btnType='button' text={t('adPage.redirect')} className={`rounded bg-blue-500 px-4 py-2 text-white`} />
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
    </div>
  );
};
