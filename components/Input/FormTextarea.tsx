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
        className={`shadow appearance-none border rounded w-full h-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        }`}
        {...register}
        placeholder={placeholder}
      />

      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
}
