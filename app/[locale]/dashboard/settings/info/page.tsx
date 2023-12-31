'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getClientUserSession } from '@/lib/actions/getClientUserSession';
import { useForm } from 'react-hook-form';
import { infoFormResolver, type InfoFormInputs } from './infoFormResolver';

import { Toast, FormLabel, DashboardFormInput, DashboardImageUpload, DashboardFormTextarea, Divider } from '@/components';
import { updateUser } from '@/lib/actions';
import { v4 as uuidv4 } from 'uuid';
import { removeSpaces } from '@/utils/';
import { createClient } from '@/utils/supabase/client';
import { useToggle } from '@/hooks';
import { ToastTitle } from '@/types';

export default function SettingsInfoPage() {
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
      firstname: '',
      lastname: '',
      user_email: '',
      user_phone: null,
      profile_picture: '',
    },
  });
  // console.log(watch());

  const [profilePicturePreview, setProfilePicturePreview] = useState<string>();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [toastSuccessMessage, setToastSuccesMessage] = useState<string>('');
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

  useEffect(() => {
    const fetchData = async () => {
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
              // return redirect('/');
            } else {
              setValue('user_id', fetchedUserData.id);
              setValue('firstname', fetchedUserData.firstname);
              setValue('lastname', fetchedUserData.lastname);
              setValue('user_email', fetchedUserData.user_email);
              setUserEmail(fetchedUserData.user_email);
              setValue('user_phone', fetchedUserData.user_phone);
              setValue('profile_picture', fetchedUserData.profile_picture);
              setProfilePicturePreview(fetchedUserData.profile_picture);
            }
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
    fetchData();
  }, []);
  const onSubmit = async (data: InfoFormInputs) => {
    let profilePictureUrl = '';
    if (typeof data.profile_picture === 'string') {
      profilePictureUrl = data.profile_picture;
    } else {
      if (data.profile_picture[0]) {
        const supabase = createClient();
        // console.log('logo', logo);

        const filename = `${uuidv4()}-${removeSpaces(data.profile_picture[0].name)}`;

        const { data: uploadData, error: uploadError } = await supabase.storage.from('profile_picture').upload(filename, data.profile_picture[0], {
          cacheControl: '3600',
          upsert: false,
        });
        if (uploadError || !uploadData) {
          // console.log(uploadError);

          return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
        }

        const { data: publicUrlData } = supabase.storage.from('profile_picture').getPublicUrl(uploadData.path);
        if (!publicUrlData) {
          // console.log(publicUrlData);

          return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
        }
        const publicUrl = publicUrlData.publicUrl;
        profilePictureUrl = publicUrl;
      }
    }

    if (!profilePictureUrl) {
      return { type: 'error' as const, message: 'Error uploading logo please try again later.' };
    }

    const response = await updateUser({ userData: JSON.parse(JSON.stringify(data)), profilePictureUrl, path: '/dashboard/settings/info' });
    // console.log('response', response);
    if (response.type === 'error') {
      setToastErrorMessage(response.message);
      setIsSubmitSuccessful(false);
      toggleToast(true);
      setTimeout(() => {
        toggleToast(false);
      }, 2000);
    } else {
      if (userEmail !== data.user_email) {
        setToastSuccesMessage('Please check your email to confirm your new email address.');
        setIsSubmitSuccessful(true);
        toggleToast(!true);
        setTimeout(() => {
          toggleToast(false);
        }, 5000);
      } else {
        setToastSuccesMessage('Your profile has been updated successfully.');
        setIsSubmitSuccessful(true);
        toggleToast(!true);
        setTimeout(() => {
          toggleToast(false);
        }, 5000);
      }
    }
  };

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  return (
    <form className='flex flex-col py-2 w-full gap-5' onSubmit={handleSubmit(onSubmit)}>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={isSubmitSuccessful ? ToastTitle.Success : ToastTitle.Error}
        message={isSubmitSuccessful ? toastSuccessMessage : toastErrorMessage}
      />
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
        <FormLabel
          htmlFor='input Company Email Address'
          labelText={t('publishAds.contactDetailsEmail')}
          className='whitespace-nowrap w-52 min-w-min max-w-sm'
        />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            register={register('user_email')}
            error={errors.user_email}
            isRequiredMessage={t('publishAds.contactDetailsEmail') + t('error.isRequired')}
            placeholder='quick.be'
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <FormLabel htmlFor='input Profile Phone Number' labelText='Phone number' className='whitespace-nowrap w-52 min-w-min max-w-sm' />
        <div className='flex flex-col gap-5'>
          <DashboardFormInput
            register={register('user_phone', { valueAsNumber: true })}
            error={errors.user_phone}
            isRequiredMessage={t('publishAds.companyName') + t('error.isRequired')}
            placeholder='491234567'
            slug='+32'
            invalidPhone='Phone number must be 9 digits long.'
          />
        </div>
      </div>
      <Divider />
      <div className='flex'>
        <DashboardImageUpload
          label='Profile Picture'
          register={register('profile_picture')}
          error={errors.profile_picture}
          initialPreview={profilePicturePreview}
        />
      </div>
      <Divider />
      <div className='flex justify-between'>
        <button type='button' className='text-brand-failed flex items-center justify-center text-center gap-2'></button>
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
