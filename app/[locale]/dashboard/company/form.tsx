'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { companyFormResolver, type CompanyFormInputs } from './companyFormResolver';

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
      address: '',
    },
  });

  const onSubmit = async (data: CompanyFormInputs) => {};

  return (
    <form className='flex flex-col w-full gap-5' onSubmit={handleSubmit(onSubmit)}>
      <div>Hello Worlds</div>
    </form>
  );
};
