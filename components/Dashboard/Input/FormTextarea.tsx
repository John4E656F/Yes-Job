import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel, InputError } from '@/components';

interface FormTextAreaProps {
  register: UseFormRegisterReturn;
  error: any;
  isRequiredMessage?: string;

  placeholder?: string;
}

export function DashboardFormTextarea({ register, error, isRequiredMessage, placeholder }: FormTextAreaProps) {
  let errorMessage;
  if (error && error.message === 'String must contain at least 1 character(s)') {
    errorMessage = isRequiredMessage;
  } else if (error) {
    errorMessage = error.message;
  }

  return (
    <div className='form-control flex'>
      <div className='w-full flex   bg-red-100'>
        <textarea
          className={`shadow appearance-none border rounded w-96 h-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? 'border-red-500' : ''
          }`}
          {...register}
          placeholder={placeholder}
        />
      </div>
      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
}
