import React from 'react';
import { default as NextLink, type LinkProps as NextLinkProps } from 'next/link';

type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
} & NextLinkProps;

export function Link({ href, children, className, onClick }: LinkProps) {
  return (
    <NextLink href={href} className={className} onClick={onClick}>
      {children}
    </NextLink>
  );
}
