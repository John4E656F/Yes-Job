import type { useTranslations } from 'next-intl';

export type TFunction = ReturnType<typeof useTranslations>;

export interface TranslationProps {
  t: TFunction;
}
