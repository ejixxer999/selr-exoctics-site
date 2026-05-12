'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function updateBookingStatus(formData: FormData) {
  const bookingId = String(formData.get('booking_id'));
  const status = String(formData.get('status'));
  const adminPassword = String(formData.get('admin_password'));

  if (!bookingId || !status) {
    throw new Error('Missing booking information.');
  }

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error('Invalid admin password.');
  }

  if (!['pending', 'approved', 'declined', 'cancelled'].includes(status)) {
    throw new Error('Invalid booking status.');
  }

  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/bookings');
  revalidatePath('/availability');
}