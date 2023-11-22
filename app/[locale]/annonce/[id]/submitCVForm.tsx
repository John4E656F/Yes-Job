import React from 'react';
import { Link, FormInput, FileUpload, Button } from '@/components';
import { ListingData, TranslationProps } from '@/types';

interface FormComponentProps extends TranslationProps {
  register: (...args: any[]) => any;
  handleSubmit: (...args: any[]) => any;
  errors: any;
  showRedirect: boolean;
  jobPost: ListingData;
}

export const SubmitCVForm: React.FC<FormComponentProps> = ({ register, handleSubmit, errors, showRedirect, jobPost, t }) => {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <FormInput
        label={t('adPage.name')}
        type='text'
        register={register('name')}
        error={errors.name}
        isRequiredMessage={t('adPage.name') + t('error.isRequired')}
        placeholder='James De Backer'
      />
      <FormInput
        label={t('adPage.phoneNumber')}
        type='text'
        register={register('phoneNumber')}
        error={errors.phoneNumber}
        isRequiredMessage={t('adPage.phoneNumber') + t('error.isRequired')}
        placeholder='+32491234567'
      />
      <FormInput
        label={t('adPage.email')}
        type='text'
        register={register('email')}
        error={errors.email}
        isRequiredMessage={t('adPage.email') + t('error.isRequired')}
        placeholder='JamesDBacker@gmail.com'
      />
      <FileUpload label={t('adPage.resume')} register={register('cvFile', { required: true })} error={errors.cvFile} />

      <div className='flex gap-2'>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
          {t('adPage.submit')}
        </button>
        {showRedirect && (
          <Link href={jobPost.externalFormURL}>
            <Button btnType='button' text={t('adPage.redirect')} className={`bg-blue-300 hover:bg-blue-700 text-white px-4 py-2 rounded`} />
          </Link>
        )}
      </div>
    </form>
  );
};
