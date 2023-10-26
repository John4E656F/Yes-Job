'use client';
import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { BiUpload } from 'react-icons/bi';
import { FormLabel, InputError } from '@/components';

interface FileUploadProps {
  register: UseFormRegisterReturn;
  error: any;
  label: string;
}

export function FileUpload({ register, error, label }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const { ref, onChange: defaultOnChange, ...rest } = register;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    if (defaultOnChange) {
      defaultOnChange(e);
    }
  };

  return (
    <div className='form-control '>
      <FormLabel htmlFor={`input${label}`} labelText={label} className='text-lg font-medium' />
      <div className='flex flex-col items-center justify-center w-full gap-4'>
        {fileName ? <p className='text-gray-500'>{fileName}</p> : null}
        <label
          htmlFor={`input${label}`}
          className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <BiUpload size={30} />
            <p className='mb-2 text-sm text-gray-500 flex flex-col text-center gap-2'>
              <span className='font-semibold'>Upload</span> Drag 'n' drop some files here, or click to select files
            </p>
          </div>
          <input id={`input${label}`} type='file' accept='.pdf,.doc' onChange={handleFileChange} ref={ref} className='hidden' {...rest} />
        </label>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
