'use client';
import React from 'react';
import { SettingsNavbarItems } from './SettingsNavbarItems';
import type { SettingsNavbarProps } from '@/types';

export const SettingsNavbar = () => {
  const settingsNavbarItems: SettingsNavbarProps[] = [
    {
      text: 'Personal Info',
      link: '/dashboard/settings/info',
    },
    // {
    //   text: 'Password',
    //   link: '/dashboard/settings/password',
    // },
    {
      text: 'Billing',
      link: '/dashboard/settings/billing',
    },
  ];
  return (
    <header>
      <h1>Settings</h1>
      <ul className=' flex flex-row gap-5 border-b list-none'>
        {settingsNavbarItems.map((item, index) => (
          <SettingsNavbarItems key={index} text={item.text} link={item.link} />
        ))}
      </ul>
    </header>
  );
};
