import createMiddleware from 'next-intl/middleware';
import { pathnames, locales } from './navigation';

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames,
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
