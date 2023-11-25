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
        className='focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 text-gray-500  shadow focus:outline-none'
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
