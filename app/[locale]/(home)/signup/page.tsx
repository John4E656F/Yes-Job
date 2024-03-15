'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FormInput, InputError, Toast, Button, LoadingSpinner } from '@/components';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { signupFormResolver, type SignupFormInputs } from './signupFormResolver';
import { useForm } from 'react-hook-form';
import { signup } from '@/lib/actions';
import { useToggle } from '@/hooks';
import { ToastTitle } from '@/types';

export default function Signup() {
  const t = useTranslations('app');
  const router = useRouter();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignupFormInputs>({
    resolver: signupFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      isCompany: '',
    },
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean | null>(null);
  const [submiting, setSubmiting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { currentState: isToastOpen, toggleState: toggleToast } = useToggle(false);

  // console.log(watch());
  // console.log(errors);
  const signUp = async (data: SignupFormInputs) => {
    const result = await signup({ data });
    setSubmiting(true);
    // console.log(result);

    if (result.type === 'success') {
      setToastMessage(t('auth.success'));
      setIsSubmitSuccessful(true);
      toggleToast(!isToastOpen);
      setTimeout(() => {
        setSubmiting(false);
        toggleToast(false);
        router.push('/en');
      }, 2000);
      reset();
    } else if (result.type === 'error' && result.message === 'User already registered') {
      setToastMessage(t('error.userExist'));
      toggleToast(true);
      setTimeout(() => {
        setSubmiting(false);
        toggleToast(false);
      }, 10000);
    } else {
      setToastMessage(t('auth.error'));
      toggleToast(true);
      setTimeout(() => {
        setSubmiting(false);
        toggleToast(false);
      }, 10000);
    }
  };

  const handleCloseToast = () => {
    toggleToast(!isToastOpen);
  };

  return (
    <div className='flex-1 flex flex-col w-full px-2 py-16 sm:max-w-md justify-center gap-2'>
      <Toast
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        title={isSubmitSuccessful ? ToastTitle.Success : ToastTitle.Error}
        message={toastMessage}
      />
      <div className='flex flex-col gap-2 mb-6'>
        <h1 className='text-3xl font-bold text-center'>{t('auth.registerTitle')}</h1>
        <p className='text-center'>{t('auth.registerSubTitle')}</p>
      </div>
      <form className='animate-in flex-1 flex flex-col w-full justify-center gap-5 text-foreground' onSubmit={handleSubmit(signUp)}>
        <FormInput
          label={t('auth.firstname') + ' *'}
          type='text'
          register={register('firstname', { required: true })}
          error={errors.firstname}
          isRequiredMessage={t('auth.firstname') + t('error.isRequired')}
          placeholder='Colonel'
        />
        <FormInput
          label={t('auth.lastname') + ' *'}
          type='text'
          register={register('lastname', { required: true })}
          error={errors.firstname}
          isRequiredMessage={t('auth.lastname') + t('error.isRequired')}
          placeholder='Sander'
        />
        <FormInput
          label={t('auth.email') + ' *'}
          type='text'
          register={register('email', { required: true })}
          error={errors.email}
          isRequiredMessage={t('auth.email') + t('error.isRequired')}
          invalidEmail={t('error.invalidEmail')}
          placeholder='you@example.com'
        />
        <FormInput
          label={t('auth.password') + ' *'}
          type='password'
          register={register('password', { required: true })}
          error={errors.password}
          isRequiredMessage={t('auth.password') + t('error.isRequired')}
          placeholder='********'
        />
        <div className='py-2 mb-6'>
          <p>{t('auth.accountType')}</p>
          <div className='flex justify-evenly pt-2'>
            <div className='flex gap-2 py-2'>
              <input type='radio' {...register('isCompany')} value='false' />
              <label className='text-md'>{t('auth.lookingForJob')}</label>
            </div>
            <div className='flex gap-2 py-2'>
              <input type='radio' {...register('isCompany')} value='true' />
              <label className='text-md'>{t('auth.lookingForEmployee')}</label>
            </div>
          </div>
          {errors.isCompany && <InputError error={{ message: t('error.errorOption') }} />}
        </div>
        {submiting ? (
          <div className=' flex w-auto gap-2 items-center px-4 h-11 justify-center text-sm bg-slate-300 text-blue-600 rounded-lg'>
            <LoadingSpinner />
            <p>Submiting...</p>
          </div>
        ) : (
          <Button
            btnType='submit'
            text={t('auth.signUp')}
            className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
        )}
        <div className='flex justify-center gap-2'>
          <label className='text-md' htmlFor='signup'>
            {t('auth.alreadyHaveAccount')}
          </label>
          <Link href='/signup' className='text-brand-secondary'>
            {t('auth.signIn')}
          </Link>
        </div>
      </form>
    </div>
  );
}
