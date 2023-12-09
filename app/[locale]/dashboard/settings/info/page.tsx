'use client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { infoFormResolver, type InfoFormInputs } from './infoFormResolver';
import type { CompanyFormProps } from '@/types';
import { Link, Input, FormLabel, DashboardFormInput, DashboardImageUpload, DashboardFormTextarea, Divider } from '@/components';

export default function SettingsInfoPage({ companyData, userData }: CompanyFormProps) {
  const t = useTranslations('app');
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InfoFormInputs>({
    resolver: infoFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      user_id: '',
      user_name: '',
      firstname: '',
      lastname: '',
      user_email: '',
      user_phone: null,
      profile_picture: '',
    },
  });

  useEffect(() => {
    if (userData) {
      setValue('user_id', userData.id);
      setValue('user_name', userData.user_name);
      setValue('contactname', userData.contactName);
      setValue('user_email', userData.user_email);
      setValue('user_phone', userData.phone);
      setValue('profile_picture', userData.profile_picture);
    }
  }, [userData]);
  const onSubmit = async (data: InfoFormInputs) => {};
  return (
    <form className='flex flex-col pt-2 w-full gap-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center'>
        <div>
          <h2>Personal Info</h2>
          <p className='text-brand-text-secondary text-sm'>Update your photo and personal details here.</p>
        </div>
        <div>
          <button
            type='submit'
            className='flex items-center px-4 h-11 justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            Save changes
          </button>
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='input Fullname' labelText='Fullname *' className='whitespace-nowrap w-52 min-w-min max-w-sm' />
        <div className='flex gap-8 '>
          <DashboardFormInput
            register={register('firstname', { required: true })}
            error={errors.firstname}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Cononel'
            type='name'
          />
          <DashboardFormInput
            register={register('lastname', { required: true })}
            error={errors.lastname}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Sanders'
            type='name'
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='input Company Website' labelText='Email address' className='whitespace-nowrap w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            register={register('user_email')}
            error={errors.user_email}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='quick.be'
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='input Profile Phone Number' labelText='Phone number' className='whitespace-nowrap w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            register={register('user_phone')}
            error={errors.user_phone}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='491234567'
            slug='+32'
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <DashboardImageUpload
          label='Company logo*'
          register={register('profile_picture')}
          error={errors.profile_picture}
          // initialPreview={userData.profile_picture}
        />
      </div>
      <Divider />
      <div className='flex justify-end'>
        <button
          type='submit'
          className='flex items-center px-4 h-11 justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
