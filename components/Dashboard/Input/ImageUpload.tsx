'use client';
import React, { useState, useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { BiUpload } from 'react-icons/bi';
import { Image } from '@/components';
import { FormLabel, InputError } from '@/components';

interface ImageUploadProps {
  register: UseFormRegisterReturn;
  error: any;
  label: string;
  initialPreview?: string;
}

export function DashboardImageUpload({ register, error, label, initialPreview }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(initialPreview ? initialPreview : null);

  const { ref, onChange: defaultOnChange, ...rest } = register;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (defaultOnChange) {
      defaultOnChange(e);
    }
  };

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  return (
    <div className='form-control flex '>
      <FormLabel htmlFor={`input${label}`} labelText={label} className='w-52 min-w-min max-w-sm' />
      <div className='flex items-center w-full gap-4 '>
        {preview ? (
          <Image src={preview as string} alt='Preview' className='w-24 h-24 p-1 object-contain border border-gray-300 rounded-xl' />
        ) : (
          <div className='w-24 h-24 p-1 object-contain border border-gray-300 rounded-xl' />
        )}
        <div>
          <label
            htmlFor={`input${label}`}
            className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6 px-5'>
              <BiUpload />
              <p className='mb-2 text-sm text-gray-500 flex flex-col text-center'>
                <span className='font-semibold'>Upload</span> Drag 'n' drop some files here, or click to select files
              </p>
              <p className='text-xs text-gray-500'>SVG, PNG or JPG (max. 800x800px)</p>
            </div>
            <input id={`input${label}`} type='file' accept='image/*' onChange={handleImageChange} ref={ref} className='hidden' {...rest} />
          </label>
        </div>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
