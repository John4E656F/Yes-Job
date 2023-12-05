import { Link } from '@/components';
import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

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

  return (
    <div className='flex-1 flex flex-col w-full px-8 py-16 sm:max-w-md justify-center gap-2'>
      <div className='flex flex-col gap-2 mb-6'>
        <h1 className='text-3xl font-bold text-center'>{t('auth.loginTitle')}</h1>
        <p className='text-center'>{t('auth.loginSubTitle')}</p>
      </div>
      <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground' action={signIn}>
        <label className='text-md' htmlFor='email'>
          {t('auth.email')}
        </label>
        <input className='rounded-md px-4 py-2 bg-inherit border mb-6' name='email' placeholder='you@example.com' required />
        <label className='text-md' htmlFor='password'>
          {t('auth.password')}
        </label>
        <input className='rounded-md px-4 py-2 bg-inherit border mb-6' type='password' name='password' placeholder='••••••••' required />
        <button className='bg-brand-primary text-white rounded-md px-4 py-2 text-foreground mb-2'>{t('auth.signIn')}</button>
        <div className='flex justify-center gap-2'>
          <label className='text-md' htmlFor='signup'>
            {t('auth.dontHaveAccount')}
          </label>
          <Link href='/signup' className='text-brand-secondary'>
            {t('auth.signUp')}
          </Link>
        </div>
        {searchParams?.message && <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>{searchParams.message}</p>}
      </form>
    </div>
  );
}
