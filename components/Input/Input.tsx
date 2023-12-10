import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends UseFormRegisterReturn {
  type?: string;
  defaultValue?: string;
  showPassword?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', showPassword, defaultValue, className, placeholder, disabled, ...props }, ref) => {
    return (
      <input
        {...props}
        className={`${className} input focus:outline-none`}
        type={showPassword ? 'text' : type}
        defaultValue={defaultValue}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  },
);

Input.displayName = 'Input';
