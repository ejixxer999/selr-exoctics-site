import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface VehiclePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error || !vehicle) {
    notFound();
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/fleet"
          className="text-sm uppercase tracking-[0.25em] text-[#b9975b]"
        >
          ← Back to Fleet
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            <div className="relative min-h-125 border border-[#b9975b]/30">
              <Image
                src={vehicle.image_url || "/placeholder-car.jpg"}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
            </div>

            {vehicle.gallery_images?.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {vehicle.gallery_images.map((image: string) => (
                  <div
                    key={image}
                    className="min-h-45 border border-[#b9975b]/20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-label={vehicle.name}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="border border-[#b9975b]/30 bg-[#15120e] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
              {vehicle.year} {vehicle.make}
            </p>
            <h1 className="mt-4 text-5xl font-light tracking-wide text-[#f3eadb]">
              {vehicle.name}
            </h1>
            <p className="mt-4 text-lg text-[#efe3cf]/70">{vehicle.subtitle}</p>
            <p className="mt-8 leading-8 text-[#efe3cf]/65">
              {vehicle.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {vehicle.features?.map((feature: string) => (
                <span
                  key={feature}
                  className="border border-[#b9975b]/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#efe3cf]/70"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/availability?vehicle=${vehicle.slug}`}
                className="border border-[#b9975b] bg-[#b9975b] px-6 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]"
              >
                Check Availability
              </Link>
              <Link
                href={`/contact?vehicle=${vehicle.slug}`}
                className="border border-[#b9975b]/60 px-6 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#efe3cf] transition hover:border-[#b9975b] hover:text-[#b9975b]"
              >
                Request Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export default async function VehicleDetailPage({ params }: PageProps) {
//   const { slug } = await params;

//   return (
//     <section className="px-6 py-24">
//       <h1 className="text-5xl text-white">Dynamic Route Works</h1>
//       <p className="mt-4 text-white">Slug: {slug}</p>
//     </section>
//   );
// }
