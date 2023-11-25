import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormLabel, InputError } from '@/components';

interface FormCheckboxProps {
  register: UseFormRegisterReturn;
  error: any;
  label: string;
  subText?: string;
}

export function FormCheckbox({ register, error, label, subText }: FormCheckboxProps) {
  return (
    <div className='form-control mb-4 flex'>
      <input
        {...register}
        id={`checkbox${label}`}
        className='mt-0.5 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500'
        type='checkbox'
      />
      <label htmlFor={`checkbox${label}`} className='ml-2 text-sm text-gray-900'>
        <p className='whitespace-nowrap font-medium'>{label}</p>
        <p className='text-gray-600'>{subText}</p>
      </label>
      {error && <InputError error={error} />}
    </div>
  );
}
