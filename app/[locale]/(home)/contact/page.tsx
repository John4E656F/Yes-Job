'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Image, Toast, FormInput, FormTextarea, Button } from '@/components';
import { useToggle } from '@/hooks';
import { ToastTitle } from '@/types';
import { contactFormResolver, type contactFormInputs } from './contactFormResolver';
import { submitContactForm } from '@/lib/actions/submitContact';

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
    const result = await submitContactForm(data);

    if (result.ok) {
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
    <header className='flex w-full flex-col items-center justify-center'>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={isSubmitSuccessful ? ToastTitle.Message : ToastTitle.Error}
        message={isSubmitSuccessful ? 'Message Sent' : 'Message failed. Try later or email yesjob.contact@gmail.com'}
      />
      <div className='container flex flex-col justify-center  py-4 md:py-8 '>
        <div className='flex flex-col items-center justify-between gap-16 lg:flex-row  '>
          <div className=' flex w-auto flex-col gap-4 text-center md:text-start'>
            <h1 className='text-5xl font-semibold'>{t('contact.title')}</h1>
            <h2 className='text-xl'>{t('contact.subText')}</h2>
          </div>
          <Image src='/images/svg/question.svg' alt='Yes Job' className='max-h-lg w-auto max-w-xs rounded-2xl object-fill' />
        </div>
      </div>
      <section className='flex w-full justify-center bg-brand-lightbg py-4 md:py-8'>
        <form className='container flex flex-col gap-4 py-2' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-4xl font-semibold'>Contact us</h2>
          <div className='flex flex-col gap-6 bg-white p-4 lg:p-5'>
            <FormInput
              placeholder='Raymond Albert Kroc'
              label={t('contact.fullName') + ' *'}
              type='text'
              register={register('fullName')}
              error={errors.fullName}
              isRequiredMessage={t('contact.fullName') + t('error.isRequired')}
            />
            <FormInput
              label={t('contact.email') + ' *'}
              type='text'
              register={register('email')}
              error={errors.email}
              invalidEmail={t('error.invalidEmail')}
              placeholder='kroc@gmail.com'
            />

            <FormTextarea
              label={t('contact.message') + ' *'}
              register={register('message')}
              error={errors.message}
              isRequiredMessage={t('contact.message') + t('error.isRequired')}
              placeholder=''
            />
          </div>
          <Button
            btnType='submit'
            text={t('cta.send')}
            className='h-11 w-full items-center justify-center rounded-lg bg-brand-primary px-4 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200 md:block md:w-auto'
          />
        </form>
      </section>
    </header>
  );
};

export default ContactPage;
