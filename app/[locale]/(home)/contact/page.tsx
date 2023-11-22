'use client';
import React, { useState } from 'react';
import { Image, Toast, FormInput, FormTextarea, Button } from '@/components';
import { useToggle } from '@/hooks';
import { ToastTitle } from '@/types';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
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
            <h1 className='text-5xl font-semibold'>{t('contact.title')}</h1>
            <h2 className='text-xl'>{t('contact.subText')}</h2>
          </div>
          <Image src='/images/svg/question.svg' alt='Yes Job' className='w-auto max-w-xs max-h-lg object-fill rounded-2xl' />
        </div>
      </div>
      <section className='w-full flex justify-center bg-brand-lightbg py-4 md:py-8'>
        <form className='flex flex-col container py-2 gap-4' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-4xl font-semibold'>Contact us</h2>
          <div className='flex flex-col bg-white p-4 lg:p-5 gap-6'>
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
            className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
        </form>
      </section>
    </header>
  );
};

export default ContactPage;
