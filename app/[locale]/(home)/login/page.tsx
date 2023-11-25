import Link from 'next/link';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { createClient } from '@/utils/supabase/server';

export default async function Login({ searchParams }: { searchParams: { message: string } }) {
  const t = await getTranslations('app');
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <div className='flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md'>
      <form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2' action={signIn}>
        <label className='text-md' htmlFor='email'>
          {t('login.email')}
        </label>
        <input className='mb-6 rounded-md border bg-inherit px-4 py-2' name='email' placeholder='you@example.com' required />
        <label className='text-md' htmlFor='password'>
          {t('login.password')}
        </label>
        <input className='mb-6 rounded-md border bg-inherit px-4 py-2' type='password' name='password' placeholder='••••••••' required />
        <button className='text-foreground mb-2 rounded-md bg-brand-primary px-4 py-2 text-white'>{t('login.signIn')}</button>
        <button formAction={signUp} className='border-foreground/20 text-foreground mb-2 rounded-md border px-4 py-2'>
          {t('login.signUp')}
        </button>
        {searchParams?.message && <p className='bg-foreground/10 text-foreground mt-4 p-4 text-center'>{searchParams.message}</p>}
      </form>
    </div>
  );
}
