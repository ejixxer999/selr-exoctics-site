import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export default async function VehicleImagesPage() {
  const cookieStore = await cookies();

  const isAdmin =
    cookieStore.get('selr_admin_session')?.value ===
    process.env.ADMIN_SESSION_SECRET;

  if (!isAdmin) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl border border-[#b9975b]/30 bg-[#15120e] p-8">
          <h1 className="text-4xl font-light text-[#f3eadb]">Admin Access Required</h1>
          <p className="mt-4 text-[#efe3cf]/65">
            Go to /admin and log in first.
          </p>
        </div>
      </section>
    );
  }

  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('id, name, image_url, gallery_images')
    .eq('active', true)
    .order('created_at', { ascending: true });

  if (error) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <p className="text-[#f3eadb]">Unable to load vehicles: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
          Admin
        </p>

        <h1 className="mt-5 text-4xl font-light text-[#f3eadb] md:text-5xl">
          Add Images to Existing Vehicle
        </h1>

        <p className="mt-6 text-[#efe3cf]/65">
          Select a vehicle from your existing fleet, then upload more images.
        </p>

        <div className="mt-10 grid gap-5">
          {vehicles?.map((vehicle) => (
            <a
              key={vehicle.id}
              href={`/admin/vehicles/images/${vehicle.id}`}
              className="border border-[#b9975b]/30 bg-[#15120e] p-5 transition hover:border-[#b9975b]"
            >
              <h2 className="text-2xl font-light text-[#f3eadb]">
                {vehicle.name}
              </h2>

              <p className="mt-2 text-sm text-[#efe3cf]/50">
                Current gallery images: {vehicle.gallery_images?.length || 0}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}