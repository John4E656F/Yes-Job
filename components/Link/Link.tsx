'use client';
import React from 'react';
import { default as NextLink, type LinkProps as NextLinkProps } from 'next/link';

type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
} & NextLinkProps;

export function Link({ href, as, children, className, onClick }: LinkProps) {
  return (
    <NextLink href={href} as={as} className={className} onClick={onClick}>
      {children}
    </NextLink>
  );
}
