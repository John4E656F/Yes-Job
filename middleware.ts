import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { pathnames, locales } from './i18n.config';

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createMiddleware({
    defaultLocale: 'en',
    locales,
  });
  const res = handleI18nRouting(req);

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  // Here we use 'res' instead of 'response', which is not defined
  return res;
}

export const config = {
  matcher: ['/', '/(en|fr|nl)/:path'],
};
