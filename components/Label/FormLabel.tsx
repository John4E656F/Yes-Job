import React from 'react';

type LabelProps = {
  htmlFor: string;
  children?: React.ReactNode;
  className?: string;
  labelText: string;
};

export function FormLabel({ htmlFor, children, className, labelText }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {labelText}
      {children}
    </label>
  );
}
