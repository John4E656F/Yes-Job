import React, { FC, ReactNode } from 'react';

export interface MenuItemProps {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean | null;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, title, action, isActive = null }) => (
  <button
    className={`mr-1 h-10 w-10 cursor-pointer rounded-md border-none bg-transparent p-1 px-2 text-black hover:bg-gray-200 active:bg-gray-200 ${
      isActive && isActive() ? 'bg-gray-200' : ''
    }`}
    onClick={action}
    title={title}
    type='button'
  >
    {icon}
  </button>
);
