import { createLocalizedPathnamesNavigation, createSharedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'fr', 'nl'] as const;

export const pathnames = {
  '/': '/',
  '/annonce': {
    en: '/ad',
    fr: '/annonce',
    nl: '/annonce',
  },
} satisfies Pathnames<typeof locales>;

// export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
//   locales,
//   pathnames,
// });

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
