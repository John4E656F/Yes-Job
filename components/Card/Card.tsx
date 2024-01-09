import type { PropsWithChildrenOptional } from '@/types';

type CardProps = { className?: string; boosted?: boolean } & PropsWithChildrenOptional;

export function Card({ children, className, boosted }: CardProps) {
  return (
    <article className={`${className} ${!boosted ? 'border border-gray-300' : 'border-2 border-blue-500'}  rounded-sm bg-white`}>{children}</article>
  );
}
