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
    <div className='form-control flex mb-4'>
      <input
        {...register}
        id={`radio-${name}-${label}`}
        className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
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
