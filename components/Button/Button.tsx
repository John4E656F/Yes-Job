'use client';
import type { MouseEventHandler, ReactNode } from 'react';

type BtnType = 'button' | 'submit';
type ButtonProps = {
  text: string | ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: BtnType;
  disabled?: boolean;
};

export const Button = ({ text, className, disabled, onClick, btnType }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={btnType}
      className={`btn shadow-brand-neo-btn ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
