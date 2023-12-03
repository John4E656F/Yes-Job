import React from 'react';
import { RiFileList3Line, RiHomeSmileLine, RiGroupLine, RiSparklingLine, RiMailLine, RiLifebuoyLine, RiSettings3Line } from 'react-icons/ri';
import { SidebarItems } from './SidebarItems';
import type { TranslationProps } from '@/types';

interface NavItemsProps {
  icon: React.ElementType;
  text: string;
  count?: number;
  link?: string;
}

interface SidebarProps extends TranslationProps {
  companyName: string;
}

export const SidebarList = ({ companyName, t }: SidebarProps) => {
  const upperNavItems: NavItemsProps[] = [
    {
      icon: RiFileList3Line,
      text: t('sidebar.joblisting'),
      count: 0,
      link: '/dashboard/job-listing',
    },
    {
      icon: RiHomeSmileLine,
      text: t('sidebar.company'),
      link: '/dashboard/company',
    },
    // {
    //   icon: RiGroupLine,
    //   text: t('sidebar.team'),
    //   // link: '/dashboard/team',
    // },
    // { icon: RiSparklingLine, text: t('sidebar.candidate') },
  ];

  const lowerNavItems: NavItemsProps[] = [
    // {
    //   icon: RiMailLine,
    //   text: t('sidebar.inbox'),
    //   count: 0,
    //   // link: '/dashboard/inbox',
    // },
    // {
    //   icon: RiLifebuoyLine,
    //   text: t('sidebar.support'),
    //   // link: '/dashboard/support',
    // },
    // {
    //   icon: RiSettings3Line,
    //   text: t('sidebar.settings'),
    //   // link: '/dashboard/settings',
    // },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <p className='text-lg'>{companyName}</p>
        <ul className='pl-2 cursor-pointer list-none'>
          {upperNavItems.map((item, index) => (
            <SidebarItems key={index} icon={item.icon} text={item.text} count={item.count} link={item.link} />
          ))}
        </ul>
      </div>
      <ul className='pl-2 cursor-pointer list-none'>
        {lowerNavItems.map((item, index) => (
          <SidebarItems key={index} icon={item.icon} text={item.text} count={item.count} link={item.link} />
        ))}
      </ul>
    </div>
  );
};
