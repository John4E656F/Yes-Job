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
    <button disabled={disabled} type={btnType} className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
