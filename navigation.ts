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
  '/dashboard/job-listing': {
    en: '/dashboard/job-listing',
    fr: '/tableau-de-/bord/listing-d-emploi',
    nl: '/dashboard/job-listing',
  },
  '/dashboard/job-listing/republish/[id]': {
    en: '/dashboard/job-listing/republish/[id]',
    fr: '/tableau-de-bord/listing-d-emploi/republier[id]',
    nl: '/dashboard/job-listing/herpubliceren/[id]',
  },
  '/dashboard/job-listing/edit/[id]': {
    en: '/dashboard/job-listing/edit/[id]',
    fr: '/tableau-de-bord/listing-d-emploi/modifier/[id]',
    nl: '/dashboard/job-listing/bewerken/[id]',
  },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
});

// export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
