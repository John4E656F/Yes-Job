import React, { FC, ReactNode } from 'react';

export interface MenuItemProps {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean | null;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, title, action, isActive = null }) => (
  <button
    className={`bg-transparent border-none rounded-md text-white cursor-pointer w-7 h-7 mr-1 p-1${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
    type='button'
  >
    {icon}
  </button>
);
