import { Link } from '@/components/Link/Link';
import React from 'react';

interface SidebarItemsProps {
  icon: React.ElementType;
  text: string;
  count?: number;
  link?: string;
}

export const SidebarItems: React.FC<SidebarItemsProps> = ({ icon: Icon, text, count, link }) => {
  return (
    <li>
      <Link href={`${link}`} className='flex items-center justify-between rounded hover:bg-brand-gray p-2'>
        <span className='flex items-center text-base font-medium gap-2'>
          <Icon size={24} className='font-normal' /> {text}
        </span>
        {count !== undefined && <span className='bg-brand-gray border rounded-3xl py-1 px-3 text-sm'>{count}</span>}
      </Link>
    </li>
  );
};
