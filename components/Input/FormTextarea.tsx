import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormLabel, InputError } from '@/components';

interface FormTextAreaProps {
  register: UseFormRegisterReturn;
  error: any;
  isRequiredMessage?: string;
  label: string;
  placeholder?: string;
}

export function FormTextarea({ register, error, isRequiredMessage, label, placeholder }: FormTextAreaProps) {
  let errorMessage;
  if (error && error.message === 'String must contain at least 1 character(s)') {
    errorMessage = isRequiredMessage;
  } else if (error) {
    errorMessage = error.message;
  }

  return (
    <div className='form-control'>
      <FormLabel htmlFor={`input${label}`} labelText={label} />

      <textarea
        className={`focus:shadow-outline h-60 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
          error ? 'border-red-500' : ''
        }`}
        {...register}
        placeholder={placeholder}
      />

      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
}
