'use server';

import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createVehicle(formData: FormData) {
  const adminPassword = String(formData.get('admin_password'));

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error('Invalid admin password.');
  }

  const name = String(formData.get('name'));
  const year = Number(formData.get('year'));
  const make = String(formData.get('make'));
  const model = String(formData.get('model'));
  const subtitle = String(formData.get('subtitle'));
  const imageUrl = String(formData.get('image_url'));
  const description = String(formData.get('description'));
  const featuresRaw = String(formData.get('features'));
  const ownerName = String(formData.get('owner_name'));
  const ownerEmail = String(formData.get('owner_email'));
  const ownerPhone = String(formData.get('owner_phone'));
  const ownerNotes = String(formData.get('owner_notes'));

  if (!name || !make || !model) {
    throw new Error('Vehicle name, make, and model are required.');
  }

  const features = featuresRaw
    .split(',')
    .map((feature) => feature.trim())
    .filter(Boolean);

  const slug = createSlug(`${year || ''} ${make} ${model}`);

  const { error } = await supabase.from('vehicles').insert({
    slug,
    name,
    year: Number.isFinite(year) ? year : null,
    make,
    model,
    subtitle,
    image_url: imageUrl || '/placeholder-car.jpg',
    description,
    features,
    owner_name: ownerName,
    owner_email: ownerEmail,
    owner_phone: ownerPhone,
    owner_notes: ownerNotes,
    active: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect('/fleet');
}