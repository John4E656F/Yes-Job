import { default as NextImage, type ImageProps } from 'next/image';

export function Image({ src, alt, width = 0, height = 0, sizes, className }: ImageProps) {
  return <NextImage src={src} alt={alt} width={width} height={height} sizes={sizes} className={className} />;
}
