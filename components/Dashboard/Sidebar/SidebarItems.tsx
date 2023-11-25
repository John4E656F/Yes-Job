import React from 'react';

import { Link } from '@/components/Link/Link';

interface SidebarItemsProps {
  icon: React.ElementType;
  text: string;
  count?: number;
  link?: string;
}

export const SidebarItems: React.FC<SidebarItemsProps> = ({ icon: Icon, text, count, link }) => {
  return (
    <li>
      <Link href={`${link}`} className='flex items-center justify-between rounded p-2 hover:bg-brand-gray'>
        <span className='flex items-center gap-2 text-base font-medium'>
          <Icon size={24} className='font-normal' /> {text}
        </span>
        {count !== undefined && <span className='rounded-3xl border bg-brand-gray px-3 py-1 text-sm'>{count}</span>}
      </Link>
    </li>
  );
};
