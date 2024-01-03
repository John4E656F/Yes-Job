'use client';
import React, { useState, useEffect } from 'react';
import { FormInput, ImageUpload, FormSelect, FormCheckbox, FormRadio, FormTextarea, Toast, Button, Tiptap } from '@/components';
import { getClientUserSession } from '@/lib/actions/getClientUserSession';
import { useTranslations } from 'next-intl';
import { redirect, useRouter } from 'next/navigation';
import { firstPublishFormResolver, type FirstPublishFormInputs } from './firstPublishFormResolver';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToggle } from '@/hooks';
import { CompanyTypes, ToastTitle, UsersTypes } from '@/types';
import { publishFirstListing } from '@/lib/actions';
import { useTransition } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { removeSpaces } from '@/utils/';
import { createClient } from '@/utils/supabase/client';

const PublishPage: React.FC = () => {
  const t = useTranslations('app');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [userData, setUserData] = useState<UsersTypes>();
  const [companyData, setCompanyData] = useState<CompanyTypes>({
    id: '',
    name: '',
    logo: '',
    website: '',
    phone: null,
    owner_id: '',
    teamMembers: [''],
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
  } = useForm<FirstPublishFormInputs>({
    resolver: firstPublishFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      user_Id: '',
      company_Id: '',
      companyName: '',
      logo: '',
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
      companyWebsite: undefined,
      companyPhone: null,
      firstname: '',
      lastname: '',
      contactPhone: null,
      contactEmail: '',
      contactPassword: '',
    },
  });
  const applicationMethod = watch('applicationMethod');
  const companyWebsite = watch('companyWebsite');
  const contactEmail = watch('contactEmail');
  const contactPassword = watch('contactPassword');
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
    if (companyWebsite) {
      register('companyWebsite', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ });
    } else {
      unregister('companyWebsite');
    }
  }, [companyWebsite]);

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
            // console.log(fetchedUserData);
            if (!fetchedUserData.isCompany) {
              return redirect('/');
            }
            if (fetchedUserData.id) {
              const responseCompany = await fetch(`/api/company/${fetchedUserData.id}`);
              const { fetchedCompanyData, fetchedCompanyError } = await responseCompany.json();

              if (fetchedCompanyData) {
                setCompanyData(fetchedCompanyData);
              }
            }
            setUserData(fetchedUserData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // console.log('No owner ID found');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.company_id !== '') {
      setValue('user_Id', userData.id || '');
      setValue('firstname', userData.firstname || '');
      setValue('lastname', userData.lastname || '');
      setValue('contactEmail', userData.user_email || '');
      setValue('contactPassword', 'User_already_exists69');
    }
  }, [userData]);

  useEffect(() => {
    if (companyData && companyData.id !== '') {
      setValue('company_Id', companyData.id || '');
      setValue('companyName', companyData.name || '');
      setValue('companyWebsite', companyData.website || '');
      setValue('logo', companyData.logo || null);
      setValue('companyPhone', companyData.phone || null);
    }
  }, [companyData]);

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

  const onSubmit = async (data: FirstPublishFormInputs) => {
    // console.log(data);
    let logoUrl = '';
    if (typeof data.logo === 'string') {
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

    const result = await publishFirstListing({ data: JSON.parse(JSON.stringify(data)), logoUrl });
    if (result) {
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
      } else if (result.type == 'error') {
        setToastErrorMessage(result.message);
        setTimeout(() => {
          toggleToast(false);
        }, 10000);
      } else {
        setToastErrorMessage('Unexpected error, please try again later.');
        setTimeout(() => {
          toggleToast(false);
        }, 10000);
      }
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
      companyWebsite: '',
      companyPhone: null,
      firstname: '',
      lastname: '',
      contactPhone: null,
      contactEmail: '',
    });
  };

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  if (userData && userData.company_id) {
    redirect('/');
  }
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
          {userData && userData.company_id ? null : (
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
                <ImageUpload label={t('publishAds.companyLogo')} register={register('logo')} error={errors.logo} initialPreview={companyData.logo} />
              </div>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.companyWebsite')}
                  type='text'
                  register={register('companyWebsite')}
                  error={errors.companyName}
                  isRequiredMessage={t('publishAds.companyWebsite') + t('error.isRequired')}
                  placeholder='quick.be'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.companyPhone')}
                  type='tel'
                  register={register('companyPhone', { valueAsNumber: true })}
                  error={errors.companyPhone}
                  isRequiredMessage={t('publishAds.companyPhone') + t('error.isRequired')}
                  placeholder='0491234567'
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
              setFirstPublishValue={setValue}
              isDashboard={false}
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
          {userData ? (
            <>
              <div className='w-full h-px bg-slate-300 rounded' />
              <h2 className='text-2xl font-semibold'>{t('publishAds.contactDetails')}</h2>
              <h3 className='text-md '>{t('publishAds.contactDetailsSub')}</h3>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactDetailsFirstname') + ' *'}
                  type='text'
                  register={register('firstname', { required: true })}
                  error={errors.firstname}
                  isRequiredMessage={t('publishAds.contactDetailsFirstname') + t('error.isRequired')}
                  placeholder='Lenny'
                />
                <FormInput
                  label={t('publishAds.contactDetailsLastname') + ' *'}
                  type='text'
                  register={register('lastname', { required: true })}
                  error={errors.lastname}
                  isRequiredMessage={t('publishAds.contactDetailsLastname') + t('error.isRequired')}
                  placeholder='Lenny'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactPhone')}
                  type='tel'
                  register={register('contactPhone', { valueAsNumber: true })}
                  error={errors.contactPhone}
                  isRequiredMessage={t('publishAds.contactPhone') + t('error.isRequired')}
                  placeholder='0412345678'
                />
              </div>
            </>
          ) : (
            <>
              <div className='w-full h-px bg-slate-300 rounded' />
              <h2 className='text-2xl font-semibold'>{t('publishAds.contactDetails')}</h2>
              <h3 className='text-md '>{t('publishAds.contactDetailsSub')}</h3>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactDetailsFirstname') + ' *'}
                  type='text'
                  register={register('firstname', { required: true })}
                  error={errors.firstname}
                  isRequiredMessage={t('publishAds.contactDetailsFirstname') + t('error.isRequired')}
                  placeholder='Lenny'
                />
                <FormInput
                  label={t('publishAds.contactDetailsLastname') + ' *'}
                  type='text'
                  register={register('lastname', { required: true })}
                  error={errors.lastname}
                  isRequiredMessage={t('publishAds.contactDetailsLastname') + t('error.isRequired')}
                  placeholder='De Wolf'
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormInput
                  label={t('publishAds.contactPhone')}
                  type='tel'
                  register={register('contactPhone', { valueAsNumber: true })}
                  error={errors.contactPhone}
                  isRequiredMessage={t('publishAds.contactPhone') + t('error.isRequired')}
                  placeholder='0412345678'
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
                  placeholder='*********'
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
