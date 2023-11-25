import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { HiOutlineEyeSlash, HiOutlineEye } from 'react-icons/hi2';

import { FormLabel, Input, InputError } from '@/components';

interface FormInputProps {
  register: UseFormRegisterReturn;
  error: any;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  label?: string;
  placeholder?: string;
  isPasswordField?: boolean;
  isRequiredMessage?: string;
  invalidURL?: string;
  invalidEmail?: string;
  className?: string;
}

export function FormInput({
  register,
  error,
  isRequiredMessage,
  invalidURL,
  invalidEmail,
  show,
  setShow,
  type,
  label,
  placeholder,
  className,
  isPasswordField = false,
}: FormInputProps) {
  let errorMessage;
  if (error && error.message === 'String must contain at least 1 character(s)') {
    errorMessage = isRequiredMessage;
  } else if (error && error.message === 'Invalid url') {
    errorMessage = invalidURL;
  } else if (error && error.message === 'Invalid email') {
    errorMessage = invalidEmail;
  } else if (error) {
    errorMessage = error.message;
  }

  return (
    <div
      className={`form-control ${
        type === 'number' && 'flex w-full items-center gap-2'
      } ${className}`}
    >
      {label && (
        <FormLabel htmlFor={`input${label}`} labelText={label} className="text-lg font-medium" />
      )}
      <div
        className={`focus:shadow-outline h-9 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none ${
          error ? 'border-red-500' : ''
        } ${isPasswordField ? 'flex items-center' : ''}`}
      >
        <Input
          className="h-full w-full grow self-stretch pl-3"
          type={show !== undefined ? (show ? 'text' : type) : type}
          {...register}
          placeholder={placeholder}
        />
        {isPasswordField && setShow && (
          <span
            className="cursor-pointer self-center pr-2 text-brand-gray"
            onClick={() => setShow(!show)}
          >
            {show ? <HiOutlineEye size={20} /> : <HiOutlineEyeSlash size={20} />}
          </span>
        )}
      </div>
      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
}
