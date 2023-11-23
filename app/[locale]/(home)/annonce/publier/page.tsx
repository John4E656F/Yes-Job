'use client';
import React, { useState, useEffect } from 'react';
import { FormInput, ImageUpload, FormSelect, FormCheckbox, FormRadio, FormTextarea, Toast, Button, Tiptap } from '@/components';
import { getClientUserSession } from '@/lib/actions/getClientUserSession';
import { useTranslations } from 'next-intl';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { publishFormResolver, type PublishFormInputs } from './publishFormResolver';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToggle } from '@/hooks';
import { ToastTitle, UsersTypes } from '@/types';
import { publishListing } from '@/lib/actions/publishListing';
import { useTransition } from 'react';

const PublishPage: React.FC = () => {
  const t = useTranslations('app');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [userData, setUserData] = useState<UsersTypes>({
    user_email: '',
    user_logo: '',
    user_name: '',
    user_total_request_count: undefined,
    isCompany: false,
    contactName: '',
    created_at: '',
    id: '',
    user_id: '',
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean | null>(null);
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
  } = useForm<PublishFormInputs>({
    resolver: publishFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      user_Id: '',
      companyName: '',
      logo: '',
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
      contactName: '',
      contactEmail: '',
      contactPassword: '',
    },
  });
  const applicationMethod = watch('applicationMethod');
  // console.log(watch());

  useEffect(() => {
    if (applicationMethod === 'yesJob') {
      unregister('externalFormURL');
    } else {
      register('externalFormURL', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ });
      setValue('externalFormURL', '');
    }
  }, [applicationMethod, register, unregister, setValue]);

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getClientUserSession();

      let ownerID;

      if (session && session.user) {
        ownerID = session.user.id;
      }

      if (ownerID) {
        try {
          const response = await fetch(`/api/user/${ownerID}`);

          if (response.ok) {
            const { fetchedUserData } = await response.json();
            setUserData(fetchedUserData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No owner ID found');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.isCompany) {
      setValue('user_Id', userData.id || '');
      setValue('contactName', userData.contactName || '');
      setValue('contactEmail', userData.user_email || '');
      setValue('companyName', userData.user_name || '');
      setValue('contactPassword', 'User_already_exists69');
      setValue('logo', userData.user_logo || null);
    }
  }, [userData]);

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

  const onSubmit = async (data: PublishFormInputs) => {
    const result = await publishListing(data);

    if (result.type == 'success') {
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);
      setTimeout(() => {
        toggleToast(false);
        router.push('/');
      }, 2000);
    } else if (result.type == 'error' && result.message === 'User already exists, please login first') {
      setToastErrorMessage('User already exists, please login first');
      setTimeout(() => {
        toggleToast(false);
        router.push('/login');
      }, 10000);
    } else {
      setToastErrorMessage('Unexpected error, please try again later.');
      setTimeout(() => {
        toggleToast(false);
      }, 10000);
    }

    reset({
      companyName: '',
      logo: null,
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
      contactName: '',
      contactEmail: '',
    });
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
        message={isSubmitSuccessful ? 'Ad submitted successfully' : toastErrorMessage}
      />
      <form className='flex flex-col container w-full lg:max-w-5xl  py-4 md:py-16 gap-5' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-4xl font-semibold'>{t('publishAds.title')}</h2>
        <div className='flex flex-col bg-white p-4 md:p-8 gap-6'>
          {userData && userData.isCompany === true ? null : (
            <>
              <h3 className='text-2xl font-semibold'>{t('publishAds.infoCompany')}</h3>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.companyName') + ' *'}
                  type='text'
                  register={register('companyName', { required: true })}
                  error={errors.companyName}
                  isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
                  placeholder='Quick, McDonald ...'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <ImageUpload
                  label={t('publishAds.companyLogo')}
                  register={register('logo')}
                  error={errors.logo}
                  initialPreview={userData.user_logo}
                />
              </div>
              <div className='w-full h-px bg-slate-300 rounded' />
            </>
          )}
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
          <div className='flex flex-col md:flex-row justify-between gap-2'>
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
            {/* <FormTextarea
              register={register('description')}
              error={errors.description}
              isRequiredMessage={t('publishAds.description') + t('error.isRequired')}
              label={t('publishAds.description') + ' *'}
              placeholder={t('publishAds.descPlaceholder')}
            /> */}
            <Tiptap
              register={register('description')}
              error={errors.description}
              isRequiredMessage={t('publishAds.description') + t('error.isRequired')}
              label={t('publishAds.description') + ' *'}
              placeholder={t('publishAds.descPlaceholder')}
              setValue={setValue}
              editable={true}
            />
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
          {userData && userData.isCompany === true ? null : (
            <>
              <div className='w-full h-px bg-slate-300 rounded' />
              <h2 className='text-2xl font-semibold'>{t('publishAds.contactDetails')}</h2>
              <h3 className='text-md '>{t('publishAds.contactDetailsSub')}</h3>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactDetailsName') + ' *'}
                  type='text'
                  register={register('contactName', { required: true })}
                  error={errors.contactName}
                  isRequiredMessage={t('publishAds.contactDetailsName') + t('error.isRequired')}
                  placeholder='Lenny De Wolf'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactDetailsEmail') + ' *'}
                  type='text'
                  register={register('contactEmail')}
                  error={errors.contactEmail}
                  invalidEmail={t('error.invalidEmail')}
                  placeholder='recrument@mcdonalds.be'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactDetailsPassword') + ' *'}
                  type='password'
                  register={register('contactPassword')}
                  error={errors.contactPassword}
                  isRequiredMessage={t('publishAds.contactDetailsPasswordValidationMin')}
                  placeholder='recrument@mcdonalds.be'
                />
              </div>
            </>
          )}
        </div>

        <Button
          btnType='submit'
          text={t('cta.publishFree')}
          className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
        />
      </form>
    </header>
  );
};

export default PublishPage;
