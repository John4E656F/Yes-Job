//NOTE: Create a loading state or skeleton before the data is fetched
'use client';
import React, { useState, useEffect } from 'react';
import { FormInput, ImageUpload, FormSelect, FormCheckbox, FormRadio, FormTextarea, Toast, Button, Tiptap } from '@/components';
import { getClientUserSession } from '@/lib/actions/getClientUserSession';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { republishFormResolver, type RepublishFormInputs } from './republishFormResolver';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToggle } from '@/hooks';
import { ToastTitle, UsersTypes } from '@/types';
import { useTransition } from 'react';

import { republishListing, saveListingAsDraft } from '@/lib/actions';
import { set } from 'date-fns';

export default function PublishPage({ params }: { params: { id: string } }) {
  const t = useTranslations('app');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isPublished, setIsPublished] = useState<boolean>();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean | null>(null);
  const [toastSucessMessage, setToastSuccessMessage] = useState<string>('');
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RepublishFormInputs>({
    resolver: republishFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: '',
      jobFunction: '',
      cdd: false,
      cdi: false,
      fullTime: false,
      partTime: false,
      experience: 'noExperience',
      description: '',
      location: '',
      salaryMin: null,
      salaryMax: null,
      applicationMethod: 'yesJob',
      externalFormURL: '',
    },
  });
  const applicationMethod = watch('applicationMethod');
  // console.log(watch());
  // console.log(errors)

  useEffect(() => {
    const fetchUserData = async () => {
      const itemId = params.id;

      try {
        const response = await fetch(`/api/jobPost/${itemId}`);

        if (response.ok) {
          const { fetchedJobPostData } = await response.json();
          setIsPublished(fetchedJobPostData.published);
          const fieldNames = Object.keys(fetchedJobPostData) as (keyof RepublishFormInputs)[];
          // console.log(fetchedJobPostData);

          fieldNames.forEach((fieldName) => {
            if (fieldName in fetchedJobPostData) {
              if (fieldName === 'experience') {
                setValue(fieldName, fetchedJobPostData[fieldName] ? 'experience' : 'noExperience');
                return;
              } else {
                setValue(fieldName, fetchedJobPostData[fieldName]);
              }
            }
          });

          if ('applicationMethod' in fetchedJobPostData) {
            if (fetchedJobPostData.applicationMethod === 'yesJob') {
              unregister('externalFormURL');
            }
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (applicationMethod === 'yesJob') {
      unregister('externalFormURL');
    } else {
      register('externalFormURL', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ });
      setValue('externalFormURL', '');
    }
  }, [applicationMethod]);

  const options = [
    { value: '', label: t('jobFonction.default'), disabled: true },
    { value: 'waiter', label: t('jobFonction.waiter') },
    { value: 'cook', label: t('jobFonction.cook') },
    { value: 'chefDePartie', label: t('jobFonction.chefDePartie') },
    { value: 'chefCook', label: t('jobFonction.chefCook') },
    { value: 'bartender', label: t('jobFonction.bartender') },
    { value: 'dishwasher', label: t('jobFonction.dishwasher') },
    { value: 'shiftLeader', label: t('jobFonction.shiftLeader') },
    { value: 'cleaningStaff', label: t('jobFonction.cleaningStaff') },
    { value: 'restaurantManager', label: t('jobFonction.restaurantManager') },
    { value: 'hotelReceptionist', label: t('jobFonction.hotelReceptionist') },
    { value: 'hotelManager', label: t('jobFonction.hotelManager') },
    { value: 'hotelMaster', label: t('jobFonction.hotelMaster') },
    { value: 'pastryChef', label: t('jobFonction.pastryChef') },
    { value: 'deliveryDriver', label: t('jobFonction.deliveryDriver') },
    { value: 'other', label: t('jobFonction.other') },
  ];

  const onSubmit = async (data: RepublishFormInputs) => {
    let result = await republishListing({ data: data, path: `/dashboard/job-listing` });

    if (result.type == 'success') {
      setToastSuccessMessage(result.message);
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);
      setTimeout(() => {
        toggleToast(false);
        router.push('/dashboard/job-listing');
      }, 2000);
    } else {
      setToastErrorMessage('Unexpected error, please try again later.');
      setTimeout(() => {
        toggleToast(false);
      }, 10000);
    }
  };

  const saveAsDraft = async (data: RepublishFormInputs) => {
    const result = await saveListingAsDraft({ data: data, path: `/dashboard/job-listing` });

    if (result.type == 'success') {
      setToastSuccessMessage('Your job offer has been saved as draft.');
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);
      setTimeout(() => {
        toggleToast(false);
        router.push('/dashboard/job-listing');
      }, 2000);
    } else {
      setToastErrorMessage('Unexpected error, please try again later.');
      setTimeout(() => {
        toggleToast(false);
      }, 10000);
    }
  };

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  return (
    <header className='w-full flex justify-center bg-brand-lightbg'>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={isSubmitSuccessful ? ToastTitle.Success : ToastTitle.Error}
        message={isSubmitSuccessful ? toastSucessMessage : toastErrorMessage}
      />
      <form className='flex flex-col container w-full lg:max-w-5xl  py-4 md:py-16 gap-5' onSubmit={handleSubmit(onSubmit)}>
        {isPublished ? <h2 className='text-4xl font-semibold'>Edit published ad</h2> : <h2 className='text-4xl font-semibold'>Edit draft</h2>}
        <div className='flex flex-col bg-white p-4 md:p-8 gap-6'>
          <h2 className='text-2xl font-semibold'>{t('publishAds.infoAds')}</h2>
          <div className='flex flex-col gap-3'>
            <FormInput
              label={t('publishAds.adsTitle') + ' *'}
              type='text'
              register={register('title')}
              error={errors.title}
              isRequiredMessage={t('publishAds.adsTitle') + t('error.isRequired')}
              placeholder={t('publishAds.adsTitlePlaceholder')}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <FormSelect
              register={register('jobFunction', { required: true })}
              error={errors.jobFunction}
              isRequiredMessage={t('publishAds.adsPosition') + t('error.isRequired')}
              label={t('publishAds.adsPosition') + ' *'}
              options={options}
            />
          </div>
          <div className='flex flex-col flex-wrap md:flex-row justify-between gap-2'>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>{t('publishAds.contractDuration')}</label>
              <div className='flex flex-row gap-8 justify-evenly '>
                <FormCheckbox register={register('cdd')} error={errors.cdd} label='CDD' subText={t('publishAds.CDD')} />
                <FormCheckbox register={register('cdi')} error={errors.cdi} label='CDI' subText={t('publishAds.CDI')} />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>{t('publishAds.workDuration')}</label>
              <div className='flex flex-row gap-8 justify-evenly'>
                <FormCheckbox register={register('fullTime')} error={errors.fullTime} label={t('listing.fullTime')} />
                <FormCheckbox register={register('partTime')} error={errors.partTime} label={t('listing.partTime')} />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>{t('publishAds.experience')}</label>
              <div className='flex flex-row gap-8 justify-evenly '>
                {watch('experience') && (
                  <>
                    <FormRadio
                      name='experience'
                      register={register('experience')}
                      error={errors.experience}
                      label={t('listing.noExperience')}
                      value='noExperience'
                      onChange={() => setValue('experience', 'noExperience')}
                    />
                    <FormRadio
                      name='experience'
                      register={register('experience')}
                      error={errors.experience}
                      label={t('listing.experience')}
                      value='experience'
                      onChange={() => setValue('experience', 'experience')}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <label className='text-lg font-medium'>{t('publishAds.salary')}</label>
            <div className='flex flex-row gap-3 justify-between'>
              <FormInput label={t('publishAds.from')} type='number' register={register('salaryMin')} error={errors.salaryMin} />
              <FormInput label={t('publishAds.to')} type='number' register={register('salaryMax')} error={errors.salaryMax} />
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            {watch('description') && (
              <Tiptap
                register={register('description')}
                error={errors.description}
                isRequiredMessage={t('publishAds.description') + t('error.isRequired')}
                label={t('publishAds.description') + ' *'}
                placeholder={t('publishAds.descPlaceholder')}
                setDashboardValue={setValue}
                isDashboard={true}
                editable={true}
                content={watch('description')}
              />
            )}
          </div>
          <div className='flex flex-col gap-3'>
            <FormInput
              label={t('publishAds.placeOfWork') + ' *'}
              type='text'
              register={register('location')}
              error={errors.location}
              isRequiredMessage={t('publishAds.placeOfWorkPlaceholder') + t('error.isRequired')}
              placeholder={t('publishAds.placeOfWorkPlaceholder')}
            />
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <h2 className='text-2xl font-semibold'>{t('publishAds.application')}</h2>
          <h3 className='text-md'>{t('publishAds.howTo')}</h3>
          <div className='flex mb-4'>
            <FormRadio
              name='applicationMethod'
              register={register('applicationMethod')}
              error={errors.applicationMethod}
              label={t('publishAds.viaYesJob')}
              subText={t('publishAds.viaYesJobSub')}
              value='yesJob'
              onChange={() => setValue('applicationMethod', 'yesJob')}
            />
          </div>
          <div className='flex flex-col mb-4'>
            <FormRadio
              name='applicationMethod'
              register={register('applicationMethod')}
              error={errors.applicationMethod}
              label={t('publishAds.viaExterne')}
              subText={t('publishAds.viaExterneSub')}
              value='externalForm'
              onChange={() => setValue('applicationMethod', 'externalForm')}
            />
            {watch('applicationMethod') === 'externalForm' && (
              <FormInput
                type='text'
                register={register('externalFormURL')}
                error={errors.externalFormURL}
                invalidURL={t('error.invalidURL')}
                placeholder={t('publishAds.viaExternePlaceholder')}
                className='ml-6'
              />
            )}
          </div>
          <div className='flex flex-col mb-4'>
            <FormRadio
              name='applicationMethod'
              register={register('applicationMethod')}
              error={errors.applicationMethod}
              label={t('publishAds.viaBoth')}
              subText={t('publishAds.viaBothSub')}
              value='both'
              onChange={() => setValue('applicationMethod', 'both')}
            />
            {watch('applicationMethod') === 'both' && (
              <FormInput
                type='text'
                register={register('externalFormURL')}
                error={errors.externalFormURL}
                invalidURL={t('error.invalidURL')}
                placeholder={t('publishAds.viaExternePlaceholder')}
                className='ml-6'
              />
            )}
          </div>
        </div>
        <div className='flex justify-center gap-5'>
          <Button
            btnType='submit'
            text={'RePublish ad'}
            className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
          {!isPublished && (
            <Button
              onClick={() => saveAsDraft(watch())}
              btnType='button'
              text={'Save as draft'}
              className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-secondary text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          )}
        </div>
      </form>
    </header>
  );
}
