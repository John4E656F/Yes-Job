import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel, InputError } from '@/components';

interface FormTextAreaProps {
  register: UseFormRegisterReturn;
  error: any;
  label: string;
  placeholder?: string;
}

export function FormTextarea({ register, error, label, placeholder }: FormTextAreaProps) {
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

      {error && <InputError error={error} />}
    </div>
  );
}
