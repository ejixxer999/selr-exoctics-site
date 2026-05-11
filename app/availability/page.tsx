import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface AvailabilityPageProps {
  searchParams: {
    vehicle?: string;
  };
}

function getMonthDays(year: number, monthIndex: number) {
  const date = new Date(year, monthIndex, 1);
  const days = [];

  while (date.getMonth() === monthIndex) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function toDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

function isDateInsideBooking(date: string, booking: { start_date: string; end_date: string }) {
  return date >= booking.start_date && date <= booking.end_date;
}

export default async function AvailabilityPage({ searchParams }: AvailabilityPageProps) {
  const selectedVehicleSlug = searchParams.vehicle;

  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: true });

  const selectedVehicle = selectedVehicleSlug
    ? vehicles?.find((vehicle) => vehicle.slug === selectedVehicleSlug)
    : vehicles?.[0];

  const { data: bookings } = selectedVehicle
    ? await supabase
        .from('bookings')
        .select('start_date, end_date, status')
        .eq('vehicle_id', selectedVehicle.id)
        .in('status', ['pending', 'approved'])
    : { data: [] };

  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const days = getMonthDays(year, monthIndex);
  const firstDayOffset = new Date(year, monthIndex, 1).getDay();
return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">Availability</p>
        <h1 className="mt-5 text-5xl font-light tracking-wide text-[#f3eadb]">Booking Calendar</h1>
        <p className="mt-6 max-w-2xl leading-8 text-[#efe3cf]/65">
          Select a vehicle to see blocked dates. Dates marked unavailable are already pending or approved for another booking.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {vehicles?.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/availability?vehicle=${vehicle.slug}`}
              className={`border px-4 py-3 text-sm uppercase tracking-[0.18em] transition ${
                selectedVehicle?.id === vehicle.id
                  ? 'border-[#b9975b] bg-[#b9975b] text-[#0f0c08]'
                  : 'border-[#b9975b]/40 text-[#efe3cf]/70 hover:border-[#b9975b] hover:text-[#b9975b]'
              }`}
            >
              {vehicle.name}
            </Link>
          ))}
        </div>

        <div className="mt-12 border border-[#b9975b]/30 bg-[#15120e] p-6">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-light text-[#f3eadb]">
                {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(now)}
              </h2>
              <p className="mt-2 text-[#efe3cf]/60">{selectedVehicle?.name}</p>
            </div>
            <div className="flex gap-4 text-sm text-[#efe3cf]/60">
              <span><span className="mr-2 inline-block h-3 w-3 bg-[#b9975b]" /> Available</span>
              <span><span className="mr-2 inline-block h-3 w-3 bg-[#3a2a1a]" /> Unavailable</span>
            </div>
          </div>

          <div className="grid grid-cols-7 border-l border-t border-[#b9975b]/20">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="border-b border-r border-[#b9975b]/20 p-3 text-center text-xs uppercase tracking-[0.2em] text-[#b9975b]">
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOffset }).map((_, index) => (
              <div key={`empty-${index}`} className="min-h-24 border-b border-r border-[#b9975b]/20 p-3" />
            ))}

            {days.map((day) => {
              const dateString = toDateString(day);
              const isUnavailable = bookings?.some((booking) => isDateInsideBooking(dateString, booking));

              return (
                <div key={dateString} className="min-h-24 border-b border-r border-[#b9975b]/20 p-3">
                  <p className="text-lg text-[#f3eadb]">{day.getDate()}</p>
                  {isUnavailable ? (
                    <p className="mt-4 bg-[#3a2a1a] px-2 py-1 text-xs uppercase tracking-[0.15em] text-[#efe3cf]/70">
                      Unavailable
                    </p>
                  ) : (
                    <p className="mt-4 bg-[#b9975b] px-2 py-1 text-xs uppercase tracking-[0.15em] text-[#0f0c08]">
                      Available
                    </p>
                  )}
                </div>
                );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}