import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import EditVehicleImagesForm from "@/app/components/EditVehicleImagesForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AddImagesToVehiclePage({ params }: PageProps) {
  const { id } = await params;

  const cookieStore = await cookies();

  const isAdmin =
    cookieStore.get("selr_admin_session")?.value ===
    process.env.ADMIN_SESSION_SECRET;

  if (!isAdmin) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl border border-[#b9975b]/30 bg-[#15120e] p-8">
          <h1 className="text-4xl font-light text-[#f3eadb]">
            Admin Access Required
          </h1>
          <p className="mt-4 text-[#efe3cf]/65">
            Go to /admin and log in first.
          </p>
        </div>
      </section>
    );
  }

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("id, name, image_url, gallery_images")
    .eq("id", id)
    .single();

  if (error || !vehicle) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <p className="text-[#f3eadb]">Vehicle not found.</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
          Admin
        </p>

        <h1 className="mt-5 text-4xl font-light text-[#f3eadb]">Add Images</h1>

        <p className="mt-4 text-[#efe3cf]/65">
          Selected vehicle: {vehicle.name}
        </p>

        <p className="mt-2 text-[#efe3cf]/50">
          Current gallery images: {vehicle.gallery_images?.length || 0}
        </p>
        <EditVehicleImagesForm
          vehicleId={vehicle.id}
          existingImages={vehicle.gallery_images || []}
        />
      </div>
    </section>
  );
}
