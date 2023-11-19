import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  });

  // Handle internationalization
  const response = handleI18nRouting(req);

  // Initialize Supabase middleware client
  const supabase = createMiddlewareClient({ req, res: response });

  // Check user session or perform any authentication-related tasks
  const { data, error } = await supabase.auth.getSession();

  if (error || !data) {
    // Handle unauthenticated user
    return NextResponse.redirect('/login');
  }

  // User authenticated, proceed with the request
  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
