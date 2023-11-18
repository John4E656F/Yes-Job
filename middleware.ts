import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  });

  // Here we use 'req' instead of 'request', which is not defined
  const res = handleI18nRouting(req);

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  // Here we use 'res' instead of 'response', which is not defined
  return res;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
