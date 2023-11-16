import React from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface NavbarProps {
  currentLocale: string;
  session: Session | null;
}

export const Sidebar = ({ currentLocale, session }: NavbarProps) => {
  return (
    <aside className='bg-red'>
      <div>Hello World</div>
    </aside>
  );
};
