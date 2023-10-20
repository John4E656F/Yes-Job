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
    <div className='form-control flex mb-4'>
      <input
        {...register}
        id={`checkbox${label}`}
        className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
        type='checkbox'
      />
      <label htmlFor={`checkbox${label}`} className='ml-2 text-sm text-gray-900'>
        <p className='font-medium whitespace-nowrap'>{label}</p>
        <p className='text-gray-600'>{subText}</p>
      </label>
      {error && <InputError error={error} />}
    </div>
  );
}
