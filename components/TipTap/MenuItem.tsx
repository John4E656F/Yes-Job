import React, { FC, ReactNode } from 'react';

export interface MenuItemProps {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean | null;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, title, action, isActive = null }) => (
  <button
    className={`bg-transparent border-none rounded-md text-black cursor-pointer w-10 h-10 mr-1 p-1${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
    type='button'
  >
    {icon}
  </button>
);
