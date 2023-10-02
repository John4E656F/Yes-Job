import type { PropsWithChildrenOptional } from '@/types';

type CardProps = { className?: string } & PropsWithChildrenOptional;

export function Card({ children, className }: CardProps) {
  return <article className={`${className} border border-gray-300 rounded-md bg-white`}>{children}</article>;
}
