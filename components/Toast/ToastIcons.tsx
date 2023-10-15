import { HiMiniCheckCircle, HiMiniExclamationCircle, HiInformationCircle, HiMiniXCircle, HiPaperAirplane } from 'react-icons/hi2';

import { ToastTitle } from '@/types';

export interface ToastIconsProps {
  title: ToastTitle;
}

export const ToastIcons = ({ title }: ToastIconsProps) => {
  switch (title) {
    case ToastTitle.Success:
      return <HiMiniCheckCircle className='text-green-500' size={40} />;
    case ToastTitle.Error:
      return <HiMiniXCircle className='text-red-500' size={35} />;
    case ToastTitle.Info:
      return <HiInformationCircle className='text-blue-500' size={25} />;
    case ToastTitle.Warning:
      return <HiMiniExclamationCircle className='text-yellow-500' size={25} />;
    case ToastTitle.Message:
      return <HiPaperAirplane className='text-emerald-500' size={25} />;
    default:
      return null;
  }
};
