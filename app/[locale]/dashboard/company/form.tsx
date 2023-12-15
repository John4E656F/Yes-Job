'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { companyFormResolver, type CompanyFormInputs } from './companyFormResolver';
import { Link, Input, FormLabel, DashboardFormInput, DashboardImageUpload, DashboardFormTextarea, Divider } from '@/components';
import { registerNewCompany, updateCompany } from '@/lib/actions';
import { v4 as uuidv4 } from 'uuid';
import { removeSpaces } from '@/utils/';
import { createClient } from '@/utils/supabase/client';
import type { CompanyFormProps } from '@/types';

export const CompanyForm = ({ companyData, userData }: CompanyFormProps) => {
  const t = useTranslations('app');
  console.log('company form', companyData);

  const [isLocked, setIsLocked] = useState<boolean>(false);
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
      owner_id: '',
      name: '',
      slug: '',
      website: '',
      logo: '',
      about: '',
      address: '',
    },
  });
  console.log(watch());
  console.log(errors);

  console.log(companyData);

  useEffect(() => {
    setValue('owner_id', userData.id);
    if (companyData) {
      setIsLocked(true);
      setValue('name', companyData.name ?? '');
      setValue('slug', companyData.slug ?? '');
      setValue('website', companyData.website ?? '');
      setValue('logo', companyData.logo ?? '');
      setValue('about', companyData.about ?? '');
      setValue('address', companyData.address ?? '');
    }
  }, [companyData]);

  const onSubmit = async (data: CompanyFormInputs) => {
    let logoUrl = '';
    if (typeof data.logo === 'string') {
      console.log('logo string');

      logoUrl = data.logo;
    } else {
      if (data.logo[0]) {
        const supabase = createClient();
        // console.log('logo', logo);

        const filename = `${uuidv4()}-${removeSpaces(data.logo[0].name)}`;

        const { data: uploadData, error: uploadError } = await supabase.storage.from('logo').upload(filename, data.logo[0], {
          cacheControl: '3600',
          upsert: false,
        });
        if (uploadError || !uploadData) {
          // console.log(uploadError);

          return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
        }

        const { data: publicUrlData } = supabase.storage.from('logo').getPublicUrl(uploadData.path);
        if (!publicUrlData) {
          // console.log(publicUrlData);

          return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
        }
        const publicUrl = publicUrlData.publicUrl;
        logoUrl = publicUrl;
      }
    }

    if (!logoUrl) {
      return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
    }
    if (!companyData) {
      const response = await registerNewCompany({ companyData: JSON.parse(JSON.stringify(data)), logoUrl, path: '/dashboard/company' });
      console.log('response', response);
    } else {
      await updateCompany({ companyData: JSON.parse(JSON.stringify(data)), logoUrl, path: '/dashboard/company' });
    }
  };

  return (
    <form className='flex flex-col pt-2 w-full gap-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center'>
        <div>
          <h2>Overview</h2>
          <p className='text-brand-text-secondary text-sm'>This information will be displayed publicly so be careful what you share.</p>
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
        <FormLabel htmlFor='input Company Name' labelText='Company Name *' className='whitespace-nowrap w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            isLocked={isLocked}
            disabled={isLocked}
            register={register('name', { required: true })}
            error={errors.name}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Quick'
            supportText={<p>Please contact us if you'd like to change your company name.</p>}
          />
          <DashboardFormInput
            isLocked={isLocked}
            disabled={isLocked}
            register={register('slug', { required: true })}
            error={errors.slug}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='quick'
            slug='yesjob.be/companies/'
            supportText={<p>Please contact us if you'd like to change your company name.</p>}
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='input Company Website' labelText='Website' className='whitespace-nowrap w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            register={register('website')}
            error={errors.website}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='quick.be'
            slug='https://'
          />
        </div>
      </div>
      <Divider />
      <DashboardImageUpload label='Company logo*' register={register('logo')} error={errors.logo} initialPreview={companyData?.logo} />
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor={`input-about`} labelText='About the company' className='w-52 min-w-min max-w-sm' />
        <DashboardFormTextarea register={register('about')} error={errors.about} isRequiredMessage={'' + t('error.isRequired')} placeholder='' />
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='inputCompanyName' labelText='Address *' className='whitespace-nowrap text-lg font-medium w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            register={register('address', { required: true })}
            error={errors.address}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='Quick, McDonald ...'
          />
        </div>
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
};
