'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Image, Toast, FormInput, FormTextarea } from '@/components';
import { useToggle } from '@/hooks';
import { ToastTitle } from '@/types';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { contactFormResolver, type contactFormInputs } from './contactFormResolver';

const ContactPage = () => {
  const t = useTranslations('app');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean | null>(null);
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<contactFormInputs>({
    resolver: contactFormResolver,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });
  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  const onSubmit = async (data: contactFormInputs) => {
    // Make a POST request to the Formspark endpoint
    const response = await fetch('https://submit-form.com/PSmSObp9', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        message: data.message,
      }),
    });
    if (response.ok) {
      reset();
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } else {
      toggleToast(true);
      setIsSubmitSuccessful(false);
      setTimeout(() => {
        toggleToast(false);
      }, 10000);
    }
  };

  return (
    <header className='w-full flex flex-col justify-center items-center'>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={isSubmitSuccessful ? ToastTitle.Message : ToastTitle.Error}
        message={isSubmitSuccessful ? 'Message Sent' : 'Message failed. Try later or email yesjob.contact@gmail.com'}
      />
      <div className='flex flex-col container justify-center  py-4 md:py-8 '>
        <div className='flex flex-col lg:flex-row gap-16 justify-between items-center  '>
          <div className=' w-auto flex flex-col gap-4 text-center md:text-start'>
            <h1 className='text-5xl font-semibold'>Do you have a question? Write!</h1>
            <h2 className='text-xl'>
              You need help? Something is not working? Would you like to ask us something? Contact us using the contact form and we will try to help
              you!
            </h2>
          </div>
          <Image src='/images/svg/question.svg' alt='Yes Job' className='w-auto max-w-xs max-h-lg object-fill bg-blue-200 rounded-2xl' />
        </div>
      </div>
      <section className='w-full flex justify-center bg-brand-lightbg py-4 md:py-8'>
        <form className='flex flex-col container py-2 gap-4' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-4xl font-semibold'>Contact us</h2>
          <div className='flex flex-col bg-white p-4 lg:p-5 gap-6'>
            <FormInput placeholder='Raymond Albert Kroc' label='Full Name' type='text' register={register('fullName')} error={errors.fullName} />
            <FormInput
              label='Email address'
              type='text'
              register={register('email')}
              error={errors.email}
              invalidEmail={t('error.invalidEmail')}
              placeholder='kroc@gmail.com'
            />

            <FormTextarea label='Message' register={register('message')} error={errors.message} isRequiredMessage='' placeholder='' />
          </div>
          <button
            type='submit'
            className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
          >
            Send
          </button>
        </form>
      </section>
    </header>
  );
};

export default ContactPage;
