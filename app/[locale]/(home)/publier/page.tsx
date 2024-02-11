'use client';
import React, { useState, useEffect } from 'react';
import { FormInput, ImageUpload, FormSelect, FormCheckbox, FormRadio, FormTextarea, Toast, Button, Tiptap, LoadingSpinner } from '@/components';
import { getClientUserSession } from '@/lib/actions/getClientUserSession';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { publishFormResolver, type PublishFormInputs } from './publishFormResolver';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToggle } from '@/hooks';
import { ListingData, ToastTitle, UsersTypes } from '@/types';
import { publishListing } from '@/lib/actions';
import { useTransition } from 'react';
import { saveNewListingAsDraft } from '@/lib/actions';

const PublishPage: React.FC = () => {
  const t = useTranslations('app');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isPublished, setIsPublished] = useState<boolean>();
  const [submiting, setSubmiting] = useState<boolean>(false);
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
  } = useForm<PublishFormInputs>({
    resolver: publishFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      user_Id: '',
      company_Id: '',
      title: '',
      jobFunction: '',
      cdd: false,
      cdi: false,
      fullTime: false,
      partTime: false,
      experience: 'noExperience',
      student: false,
      flexi: false,
      english: false,
      french: false,
      dutch: false,
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
  // console.log(errors);

  useEffect(() => {
    if (applicationMethod === 'yesJob') {
      unregister('externalFormURL');
    } else {
      register('externalFormURL', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ });
      setValue('externalFormURL', '');
    }
  }, [applicationMethod]);

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getClientUserSession();

      let sessionId;

      if (!session) {
        router.push('/login');
      } else {
        sessionId = session.user.id;
      }

      if (sessionId) {
        try {
          const response = await fetch(`/api/company/jobListing/${sessionId}`);

          if (response.ok) {
            const { fetchedUserData, fetchedCompanyData, fetchedJobPostData, fetchedCompanyError } = await response.json();
            // console.log('publish fetchedUserData', fetchedUserData);
            // console.log('publish fetchedCompanyData', fetchedCompanyData);
            // console.log('publish fetchedJobPostData', fetchedJobPostData);

            let usedListing = [];
            if (fetchedJobPostData) {
              usedListing = fetchedJobPostData.filter((listing: ListingData) => listing.published === true);
            }

            if (fetchedCompanyData.availableJobListing === usedListing.length) {
              setToastErrorMessage('You have reached your maximum job listing limit.');
              toggleToast(true);
              setTimeout(() => {
                router.push('/dashboard/job-listing');
              }, 2000);
            }
            setValue('user_Id', fetchedUserData.id || '');

            if (fetchedCompanyError) {
              setToastErrorMessage('Please setup your company profile first.');
              toggleToast(true);
              setTimeout(() => {
                router.push('/dashboard/company');
              }, 2000);
              console.error('Failed to fetch user data:', fetchedCompanyError);
            }
            setValue('company_Id', fetchedCompanyData.id || '');
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No owner ID found');
        router.push('/login');
      }
    };
    fetchUserData();
  }, []);

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
    setSubmiting(true);
    const result = await publishListing(data);

    if (result.type == 'success') {
      setToastSuccessMessage(t('toast.publishSuccess'));
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);
      setTimeout(() => {
        toggleToast(false);
        router.push('/');
      }, 5000);
    } else {
      setToastErrorMessage(t('toast.unexpectedError'));
      setTimeout(() => {
        toggleToast(false);
        setSubmiting(false);
      }, 10000);
    }

    reset({
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
    });
  };

  const saveAsDraft = async (data: PublishFormInputs) => {
    const result = await saveNewListingAsDraft({ data: data, path: `/dashboard/job-listing` });

    if (result.type == 'success') {
      setToastSuccessMessage(t('toast.draftSaveSuccess'));
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);
      setTimeout(() => {
        toggleToast(false);
        router.push('/dashboard/job-listing');
      }, 2000);
    } else {
      setToastErrorMessage(t('toast.unexpectedError'));
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
        <h2 className='text-4xl font-semibold'>Published an ad</h2>
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
              <div className='flex flex-row flex-wrap gap-8  justify-evenly'>
                <div className='flex gap-8 justify-evenly'>
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
                <div className='flex gap-8 justify-evenly'>
                  <FormCheckbox register={register('student')} error={errors.student} label='Student' />
                  <FormCheckbox register={register('flexi')} error={errors.flexi} label='Flexi-Job' />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>Languages</label>
              <div className='flex flex-row gap-8 justify-evenly'>
                <FormCheckbox register={register('english')} error={errors.english} label='English' />
                <FormCheckbox register={register('french')} error={errors.french} label='French' />
                <FormCheckbox register={register('dutch')} error={errors.dutch} label='Dutch' />
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
            <Tiptap
              register={register('description')}
              error={errors.description}
              isRequiredMessage={t('publishAds.description') + t('error.isRequired')}
              label={t('publishAds.description') + ' *'}
              placeholder={t('publishAds.descPlaceholder')}
              setValue={setValue}
              isDashboard={false}
              editable={true}
              content={watch('description')}
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
        </div>
        <div className='flex justify-center gap-5'>
          {submiting ? (
            <div className=' flex w-auto gap-2 items-center px-4 h-11 justify-center text-sm bg-slate-300 text-blue-600 rounded-lg'>
              <LoadingSpinner />
              <p>Submiting...</p>
            </div>
          ) : (
            <Button
              btnType='submit'
              text={'Publish'}
              className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          )}
          {!isPublished && (
            <Button
              onClick={() => saveAsDraft(watch())}
              btnType='button'
              text={'Save as draft'}
              disabled={submiting}
              className={`w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-secondary text-white rounded-lg  ${
                submiting ? 'hover:none bg-slate-200' : 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
              }`}
            />
          )}
        </div>
      </form>
    </header>
  );
};

export default PublishPage;
