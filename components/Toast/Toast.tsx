import React from 'react';
import { useTranslations } from 'next-intl';
import type { ToastProps } from '@/types';
import { HiXMark } from 'react-icons/hi2';
import { ToastIcons } from './ToastIcons';

export const Toast: React.FC<ToastProps> = ({ isOpen, onClose, title, message, link }) => {
  if (!isOpen) return null;

  const t = useTranslations('app');

  return (
    <dialog
      id='toast'
      className='fixed bottom-0 right-0 m-4 flex items-center w-fit max-w-md p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow'
    >
      <div className='flex items-center w-auto justify-between gap-5' role='dialog'>
        <div className=' flex gap-3 items-center'>
          <div className='w-8 flex-none'>
            <ToastIcons title={title} />
          </div>
          <div className='flex-grow'>
            <p>{message}</p>
          </div>
        </div>
        <div>
          <HiXMark onClick={onClose} className={` cursor-pointer `} size={30} />
        </div>
      </div>
    </dialog>
  );
};
