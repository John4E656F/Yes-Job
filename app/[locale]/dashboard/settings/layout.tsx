import React from 'react';
import { SettingsNavbar } from '@/components';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-full flex flex-col py-4 pt-10 px-10 gap-y-8'>
      <SettingsNavbar />
      {children}
    </section>
  );
}
