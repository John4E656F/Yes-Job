import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'fr', 'nl'];

export const locale = ['en', 'fr', 'nl'] as const;
export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    fr: '/nomdechemin',
    nl: '/padnamen',
  },
} satisfies Pathnames<typeof locale>;

export type AppPathnames = keyof typeof pathnames;
