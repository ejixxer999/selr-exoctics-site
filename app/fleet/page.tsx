import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default async function FleetPage() {
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: true });

  if (error) {
    return <p className="px-6 py-24 text-[#f3eadb]">Unable to load fleet.</p>;
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">The Fleet</p>
        <h1 className="mt-5 text-5xl font-light tracking-wide text-[#f3eadb]">Available Motorcars</h1>
        <p className="mt-6 max-w-2xl leading-8 text-[#efe3cf]/65">
          Select a vehicle to view specifications, service options, and booking availability.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles?.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/fleet/${vehicle.slug}`}
              className="group border border-[#b9975b]/30 bg-[#15120e] transition hover:border-[#b9975b]"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={vehicle.image_url || '/placeholder-car.jpg'}
                  alt={vehicle.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-[#b9975b]">
                  {vehicle.year} {vehicle.make}
                </p>
                <h2 className="mt-3 text-2xl font-light text-[#f3eadb]">{vehicle.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[#efe3cf]/60">{vehicle.subtitle}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#b9975b]">
                  View Details
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}