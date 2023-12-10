'use client';
import React, { useState, useEffect } from 'react';
import { submitCVFormResolver, type submitCVFormInputs } from './submitCVFormResolver';
import type { ListingData, TranslationProps, viewCounterResponseType } from '@/types';
import { useForm } from 'react-hook-form';
import { ToastTitle, UsersTypes } from '@/types';
import { useToggle } from '@/hooks';
import { SubmitCVForm } from './submitCVForm';
import { Link, Button, Toast } from '@/components';
import { useTranslations } from 'next-intl';

export const ContactForm = ({ jobPost }: { jobPost: ListingData }) => {
  const t = useTranslations('app');
  // console.log('jobPost', jobPost);

  const [userData, setUserData] = useState<UsersTypes>();
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

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean | null>(null);
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await fetch(`/api/user/${jobPost.company.owner_id}`);
      const { fetchedUserData } = await userResponse.json();
      setUserData(fetchedUserData);
    };
    fetchUserData();
  });
  const onSubmit = async (data: submitCVFormInputs) => {
    try {
      const { name, email, phoneNumber, cvFile } = data;

      if (!jobPost || !jobPost.company.id || !userData || !userData.user_email) {
        console.error('Recruiter email is not available');
        return;
      }

      const recruiterEmail = userData.user_email;

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
        setIsSubmitSuccessful(true);
        toggleToast(!isToastOpen);
        setTimeout(() => {
          toggleToast(false);
        }, 2000);
      } else {
        console.error('Form submission failed');
        setIsSubmitSuccessful(false);
        toggleToast(!isToastOpen);
        setTimeout(() => {
          toggleToast(false);
        }, 10000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  return (
    <div className='flex flex-col gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={isSubmitSuccessful ? ToastTitle.Success : ToastTitle.Error}
        message={isSubmitSuccessful ? 'Ad submitted successfully' : 'Unexpected error, please try again later.'}
      />
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
    </div>
  );
};
