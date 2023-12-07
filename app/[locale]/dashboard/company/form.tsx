'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { companyFormResolver, type CompanyFormInputs } from './companyFormResolver';
import { Link, Input, FormLabel, DashboardFormInput, DashboardImageUpload, DashboardFormTextarea, Divider } from '@/components';

export const CompanyForm = () => {
  const t = useTranslations('app');

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CompanyFormInputs>({
    resolver: companyFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      slug: '',
      website: '',
      logo: '',
      about: '',
      address: '',
    },
  });

  const onSubmit = async (data: CompanyFormInputs) => {};

  return (
    <form className='flex flex-col pt-2 w-full gap-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center'>
        <div>
          <h2>Overview</h2>
          <p className='text-brand-text-secondary text-sm'>This information will be displayed publicly so be careful what you share.</p>
        </div>
        <div>
          <Link
            href='/annonce/publier'
            className='flex items-center h-11 justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <button type='button' className='px-4 h-11 text-sm'>
              Save changes
            </button>
          </Link>
        </div>
      </div>
      <div className='flex'>
        <FormLabel htmlFor='inputCompanyName' labelText='Company Name' className='whitespace-nowrap text-lg font-medium w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            // label='Company Name*'
            type='text'
            register={register('name', { required: true })}
            error={errors.name}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Quick, McDonald ...'
          />
          {/* <input className='w-full h-full pl-3 grow self-stretch ' type='text' {...register('slug')} placeholder='hello world' /> */}
          <DashboardFormInput
            // label='Company Name*'
            type='text'
            register={register('name', { required: true })}
            error={errors.name}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Quick, McDonald ...'
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='inputCompanyName' labelText='Website *' className='whitespace-nowrap text-lg font-medium w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            // label='Company Name*'
            type='text'
            register={register('name', { required: true })}
            error={errors.name}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Quick, McDonald ...'
          />
        </div>
      </div>
      <Divider />
      <DashboardImageUpload label='Company logo*' register={register('logo')} error={errors.logo} initialPreview='' />
      <Divider />
      <DashboardFormTextarea
        label='About the company'
        register={register('about')}
        error={errors.about}
        isRequiredMessage={'' + t('error.isRequired')}
        placeholder=''
      />
    </form>
  );
};
