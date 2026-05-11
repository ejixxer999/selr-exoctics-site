import { vehicles } from "../data/vehicles";

const days = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  return `2026-05-${String(day).padStart(2, "0")}`;
});

function formatDay(date: string) {
  return Number(date.split("-")[2]);
}

export default function AvailabilityPage() {
  const vehicle = vehicles[0];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">Availability</p>
        <h1 className="mt-5 text-5xl font-light tracking-wide text-[#f3eadb]">Booking Calendar</h1>
        <p className="mt-6 max-w-2xl leading-8 text-[#efe3cf]/65">
          This is a starter display calendar. Later, this can be connected to Google Calendar, Calendly, Supabase, or a custom booking system.
        </p>

        <div className="mt-12 border border-[#b9975b]/30 bg-[#15120e] p-6">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-light text-[#f3eadb]">May 2026</h2>
              <p className="mt-2 text-[#efe3cf]/60">{vehicle.name}</p>
            </div>
            <div className="flex gap-4 text-sm text-[#efe3cf]/60">
              <span><span className="mr-2 inline-block h-3 w-3 bg-[#b9975b]" /> Available</span>
              <span><span className="mr-2 inline-block h-3 w-3 bg-[#3a2a1a]" /> Booked</span>
            </div>
          </div>

          <div className="grid grid-cols-7 border-l border-t border-[#b9975b]/20">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="border-b border-r border-[#b9975b]/20 p-3 text-center text-xs uppercase tracking-[0.2em] text-[#b9975b]">
                {day}
              </div>
            ))}

            {days.map((date) => {
              const isAvailable = vehicle.availability.available.includes(date);
              const isBooked = vehicle.availability.booked.includes(date);

              return (
                <div key={date} className="min-h-24 border-b border-r border-[#b9975b]/20 p-3">
                  <p className="text-lg text-[#f3eadb]">{formatDay(date)}</p>
                  {isAvailable && <p className="mt-4 bg-[#b9975b] px-2 py-1 text-xs uppercase tracking-[0.15em] text-[#0f0c08]">Available</p>}
                  {isBooked && <p className="mt-4 bg-[#3a2a1a] px-2 py-1 text-xs uppercase tracking-[0.15em] text-[#efe3cf]/70">Booked</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}