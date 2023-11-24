import { createLocalizedPathnamesNavigation, createSharedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'fr', 'nl'] as const;

export const pathnames = {
  '/': '/',
  '/annonce': {
    en: '/ad',
    fr: '/annonce',
    nl: '/annonce',
  },
  '/annonce/publier': {
    en: '/ad/publish',
    fr: '/annonce/publier',
    nl: '/ad/publiceer',
  },
  '/annonce/[id]': {
    en: '/ad/[id]',
    fr: '/annonce/[id]',
    nl: '/ad/[id]',
  },
  '/contact': {
    en: '/contact',
    fr: '/contact',
    nl: '/contact',
  },
  '/login': {
    en: '/login',
    fr: '/connexion',
    nl: '/inloggen',
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
});

// export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
