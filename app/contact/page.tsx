import { supabase } from "@/lib/supabase";
import BookingRequestForm from "../components/BookingRequestForm";

export default async function ContactPage() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("id, name, slug")
    .eq("active", true)
    .order("created_at", { ascending: true });

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
            Booking Request
          </p>

          <h1 className="mt-5 text-4xl font-light tracking-wide text-[#f3eadb] md:text-5xl">
            Request your date.
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-[#efe3cf]/65">
            Submit your event details and we will confirm availability, service options, and quote the booking individually.
          </p>

          <div className="mt-10 space-y-4 text-[#efe3cf]/70">
            <p>No instant online pricing.</p>
            <p>Each request is reviewed based on vehicle, date, location, service type, and duration.</p>
            <p>Dates may show as unavailable while a request is pending review.</p>
          </div>
        </div>

        {error ? (
          <p className="text-[#efe3cf]">Unable to load vehicles.</p>
        ) : (
          <BookingRequestForm vehicles={vehicles || []} />
        )}
      </div>
    </section>
  );
}