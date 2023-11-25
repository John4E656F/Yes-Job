import React, { FC, ReactNode } from 'react';

export interface MenuItemProps {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean | null;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, title, action, isActive = null }) => (
  <button
    className={`bg-transparent border-none rounded-md text-black cursor-pointer w-10 h-10 mr-1 p-1 px-2 hover:bg-gray-200 active:bg-gray-200 ${
      isActive && isActive() ? 'bg-gray-200' : ''
    }`}
    onClick={action}
    title={title}
    type='button'
  >
    {icon}
  </button>
);
