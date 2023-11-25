// import React, { useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { BiUpload } from 'react-icons/bi';

import { FormLabel, InputError } from '@/components';

interface FileUploadProps {
  register: UseFormRegisterReturn;
  error: any;
  label: string;
}

export function FileUpload({ register, error, label }: FileUploadProps) {
  // const fileNameRef = useRef<string | null>(null);
  const { ref, onChange: defaultOnChange, ...rest } = register;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // fileNameRef.current = file.name;
    }
    if (defaultOnChange) {
      defaultOnChange(e);
    }
  };

  return (
    <div className='form-control '>
      <FormLabel htmlFor={`input${label}`} labelText={label} className='text-lg font-medium' />
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        {/* {fileNameRef.current ? <p className='text-gray-500'>{fileNameRef.current}</p> : null} */}
        <label
          htmlFor={`input${label}`}
          className='flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
        >
          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
            <BiUpload size={30} />
            <p className='mb-2 flex flex-col gap-2 text-center text-sm text-gray-500'>
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
