import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { InputError } from '@/components';

interface FormRadioProps {
  name: string;
  register: UseFormRegisterReturn;
  error: any;
  label: string;
  subText?: string;
  value: string;
  onChange?: () => void;
}

export function FormRadio({ name, register, error, label, subText, value, onChange }: FormRadioProps) {
  return (
    <div className='form-control mb-4 flex'>
      <input
        {...register}
        id={`radio-${name}-${label}`}
        className='mt-0.5 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500'
        type='radio'
        value={value}
        onChange={onChange}
      />
      <label htmlFor={`radio-${name}`} className='ml-2 text-sm text-gray-900'>
        <p className='font-medium'>{label}</p>
        <p className='text-gray-600'>{subText}</p>
      </label>
      {error && <InputError error={error} />}
    </div>
  );
}
