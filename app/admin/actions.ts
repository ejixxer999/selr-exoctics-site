'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData) {
  const password = String(formData.get('password') || '');

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin?error=incorrect');
  }

  const cookieStore = await cookies();

  cookieStore.set('selr_admin_session', process.env.ADMIN_SESSION_SECRET || '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  redirect('/admin');
}

export async function adminLogout() {
  const cookieStore = await cookies();

  cookieStore.delete('selr_admin_session');

  redirect('/admin');
}