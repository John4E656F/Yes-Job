import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel, InputError } from '@/components';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  register: UseFormRegisterReturn;
  error: any;
  isRequiredMessage?: string;
  label: string;
  options: Option[];
}

export function FormSelect({ register, error, isRequiredMessage, label, options }: FormSelectProps) {
  let errorMessage;
  if (error && error.message === 'String must contain at least 1 character(s)') {
    errorMessage = isRequiredMessage;
  } else if (error) {
    errorMessage = error.message;
  }

  return (
    <div className='form-control'>
      <FormLabel htmlFor={`select${label}`} labelText={label} />
      <select
        {...register}
        id={`select${label}`}
        className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-500  focus:outline-none focus:shadow-outline'
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
}
