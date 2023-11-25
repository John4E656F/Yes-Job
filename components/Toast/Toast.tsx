import React from 'react';
import { HiXMark } from 'react-icons/hi2';

import type { ToastProps } from '@/types';
import { ToastIcons } from './ToastIcons';

export const Toast: React.FC<ToastProps> = ({ isOpen, onClose, title, message, link }) => {
  if (!isOpen) return null;

  return (
    <dialog
      id='toast'
      className='fixed bottom-0 right-0 z-50 m-4 flex w-fit max-w-md items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-gray-500 shadow'
    >
      <div className='flex w-auto items-center justify-between gap-5' role='dialog'>
        <div className=' flex items-center gap-3'>
          <div className='w-8 flex-none'>
            <ToastIcons title={title} />
          </div>
          <div className='grow'>
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
