import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel, Input, InputError } from '@/components';
import { HiOutlineEyeSlash, HiOutlineEye } from 'react-icons/hi2';

interface FormInputProps {
  register: UseFormRegisterReturn;
  error: any;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  label: string;
  placeholder?: string;
  isPasswordField?: boolean;
}

export function FormInput({ register, error, show, setShow, type, label, placeholder, isPasswordField = false }: FormInputProps) {
  return (
    <div className={`form-control ${type == 'number' && 'flex items-center gap-2 w-full'}`}>
      <FormLabel htmlFor={`input${label}`} labelText={label} className='text-lg font-medium' />
      <div
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        } ${isPasswordField ? 'flex items-center' : ''}`}
      >
        <Input className='grow self-stretch' type={show !== undefined ? (show ? 'text' : type) : type} {...register} placeholder={placeholder} />
        {isPasswordField && setShow && (
          <span className='cursor-pointer self-center pr-2 text-brand-gray' onClick={() => setShow(!show)}>
            {show ? <HiOutlineEye size={20} /> : <HiOutlineEyeSlash size={20} />}
          </span>
        )}
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
