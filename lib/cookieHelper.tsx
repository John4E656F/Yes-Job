'use server';
import { cookies } from 'next/headers';

export async function getCookies(key: string) {
  const cookieStore = cookies();

  const consent = cookieStore.get(key);

  console.log('consent', consent);
}

export async function setCookies(key: string) {
  const cookieStore = cookies();
  cookieStore.set(key, 'given');
}
