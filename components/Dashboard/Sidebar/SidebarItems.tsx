import React from 'react';
import { RiFileList3Line } from 'react-icons/ri';

interface SidebarItemsProps {
  icon: React.ElementType;
  text: string;
  count?: number;
}

export const SidebarItems: React.FC<SidebarItemsProps> = ({ icon: Icon, text, count }) => {
  return (
    <li className='flex items-center justify-between rounded hover:bg-brand-gray p-2'>
      <span className='flex items-center text-base font-medium gap-2'>
        <Icon size={24} className='font-normal' /> {text}
      </span>
      {count !== undefined && <span className='bg-brand-gray border rounded-3xl py-1 px-3 text-sm'>{count}</span>}
    </li>
  );
};
