import React from 'react';
import { Link } from '@/components/Link/Link';
import { usePathname } from '@/navigation';
import type { SettingsNavbarProps } from '@/types';

export const SettingsNavbarItems = ({ text, link }: SettingsNavbarProps) => {
  const pathname = usePathname();

  return (
    <li className={`${link === pathname && 'border-b-2 border-brand-primary text-brand-primary'} `}>
      <Link href={link} className='block py-2 rounded hover:text-gray-400 md:border-0 ' aria-current='page'>
        {text}
      </Link>
    </li>
  );
};
