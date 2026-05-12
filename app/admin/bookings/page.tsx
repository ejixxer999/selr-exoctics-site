/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';
import { updateBookingStatus } from './actions';

interface SearchParams {
  password?: string;
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const isAdmin = searchParams.password === process.env.ADMIN_PASSWORD;
  const passwordWasSubmitted = Boolean(searchParams.password)

  if (!isAdmin) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl border border-[#b9975b]/30 bg-[#15120e] p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">Admin</p>
          <h1 className="mt-4 text-4xl font-light text-[#f3eadb]">Booking Access</h1>
          <p className="mt-4 text-[#efe3cf]/65">Enter the admin password to view booking requests.</p>
          {passwordWasSubmitted && (
            <p className='mt-4 border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200'>
              Password incorrect. Please try again.
            </p>
          )}
          <form className="mt-8">
            <input
              name="password"
              type="password"
              placeholder="Admin password"
              className="w-full border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />
            <button
              type="submit"
              className="mt-4 w-full border border-[#b9975b] bg-[#b9975b] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]"
            >
              Enter Admin
            </button>
          </form>
        </div>
      </section>
    );
  }
const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id,
      customer_name,
      customer_email,
      customer_phone,
      event_type,
      event_location,
      start_date,
      end_date,
      status,
      notes,
      created_at,
      vehicles (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="px-6 py-24 text-[#f3eadb]">Unable to load bookings: {error.message}</p>;
  }
return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">Admin</p>
        <h1 className="mt-5 text-4xl font-light tracking-wide text-[#f3eadb] md:text-5xl">
          Booking Requests
        </h1>
        <p className="mt-6 max-w-2xl leading-8 text-[#efe3cf]/65">
          Approve or decline customer booking requests. Approved and pending requests block availability.
        </p>

        <div className="mt-12 grid gap-6">
          {bookings?.map((booking: any) => (
            <article key={booking.id} className="border border-[#b9975b]/30 bg-[#15120e] p-5 md:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-light text-[#f3eadb]">{booking.customer_name}</h2>
                    <span className="border border-[#b9975b]/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#b9975b]">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-2 text-sm leading-6 text-[#efe3cf]/70 md:grid-cols-2">
                    <p><span className="text-[#b9975b]">Vehicle:</span> {booking.vehicles?.name}</p>
                    <p><span className="text-[#b9975b]">Event:</span> {booking.event_type || 'Not provided'}</p>
                    <p><span className="text-[#b9975b]">Dates:</span> {booking.start_date} to {booking.end_date}</p>
                    <p><span className="text-[#b9975b]">Location:</span> {booking.event_location || 'Not provided'}</p>
                    <p><span className="text-[#b9975b]">Email:</span> {booking.customer_email}</p>
                    <p><span className="text-[#b9975b]">Phone:</span> {booking.customer_phone || 'Not provided'}</p>
                  </div>

                  {booking.notes && (
                    <p className="mt-5 border-l border-[#b9975b]/40 pl-4 leading-7 text-[#efe3cf]/65">
                      {booking.notes}
                    </p>
                  )}
                </div>

                <div className="flex min-w-52 flex-col gap-3">
                  <form action={updateBookingStatus}>
                    <input type="hidden" name="booking_id" value={booking.id} />
                    <input type="hidden" name="status" value="approved" />
                    <input type="hidden" name="admin_password" value={searchParams.password} />
                    <button className="w-full border border-[#b9975b] bg-[#b9975b] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]">
                      Approve
                    </button>
                  </form>

                  <form action={updateBookingStatus}>
                    <input type="hidden" name="booking_id" value={booking.id} />
                    <input type="hidden" name="status" value="declined" />
                    <input type="hidden" name="admin_password" value={searchParams.password} />
                    <button className="w-full border border-red-400/50 px-5 py-3 text-sm uppercase tracking-[0.18em] text-red-200 transition hover:bg-red-950/30">
                      Decline
                    </button>
                  </form>

                  <form action={updateBookingStatus}>
                    <input type="hidden" name="booking_id" value={booking.id} />
                    <input type="hidden" name="status" value="cancelled" />
                    <input type="hidden" name="admin_password" value={searchParams.password} />
                    <button className="w-full border border-[#efe3cf]/20 px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#efe3cf]/50 transition hover:border-[#efe3cf]/50">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}