import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { pathnames, locales } from './navigation';

export default async function middleware(request: NextRequest) {
  try {
    // Creating the Supabase client
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession();

    // Internationalization middleware
    const intlMiddleware = createIntlMiddleware({
      defaultLocale: 'en',
      locales,
      pathnames,
    });

    // Handling internationalization
    const intlResponse = await intlMiddleware(request);

    // Returning the Supabase response or the internationalization response
    return response ?? intlResponse;
  } catch (e) {
    // If a Supabase client could not be created
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
