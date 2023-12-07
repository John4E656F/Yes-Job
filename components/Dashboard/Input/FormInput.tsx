import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel, Input, InputError } from '@/components';
import { HiOutlineLockClosed, HiOutlineEye } from 'react-icons/hi2';

interface FormInputProps {
  register: UseFormRegisterReturn;
  error: any;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  isLocked?: boolean;
  isRequiredMessage?: string;
  invalidURL?: string;
  invalidEmail?: string;
  className?: string;
  slug?: string;
  supportText?: React.ReactNode | string;
}

export function DashboardFormInput({
  register,
  error,
  isRequiredMessage,
  invalidURL,
  invalidEmail,
  disabled = false,
  placeholder,
  className,
  isLocked = false,
  slug,
  supportText,
}: FormInputProps) {
  let errorMessage;
  if (error && error.message === 'String must contain at least 1 character(s)') {
    errorMessage = isRequiredMessage;
  } else if (error && error.message === 'Invalid url') {
    errorMessage = invalidURL;
  } else if (error && error.message === 'Invalid email') {
    errorMessage = invalidEmail;
  } else if (error) {
    errorMessage = error.message;
  }

  return (
    <div className={`form-control flex items-center content-start flex-wrap w-min ${className}`}>
      <div
        className={` flex  items-center shadow appearance-none border rounded w-96 h-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
        ${isLocked && !slug && 'bg-gray-300'} ${error ? 'border-red-500' : ''}`}
      >
        {slug && <p className='px-3 bg-gray-300 h-full flex items-center'>{slug}</p>}
        <Input
          className={`w-full h-full pl-3 grow self-stretch ${isLocked && !slug && 'bg-gray-300'}`}
          type='text'
          {...register}
          placeholder={placeholder}
          disabled={disabled}
        />
        {isLocked && (
          <span className='pr-2 '>
            <HiOutlineLockClosed size={20} />
          </span>
        )}
      </div>
      {supportText && <div className='text-sm text-gray-500'>{supportText}</div>}
      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
}
