import type { PropsWithChildrenOptional } from '@/types';

type CardProps = { className?: string; pinned?: boolean } & PropsWithChildrenOptional;

export function Card({ children, className, pinned }: CardProps) {
  return (
    <article className={`${className} ${!pinned ? 'border border-gray-300' : 'border-2 border-blue-500'}  rounded-sm bg-white`}>{children}</article>
  );
}
