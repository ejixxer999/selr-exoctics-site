import Link from 'next/link';
import { cookies } from 'next/headers';
import { adminLogin, adminLogout } from './actions';

interface AdminPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();

  const isAdmin =
    cookieStore.get('selr_admin_session')?.value ===
    process.env.ADMIN_SESSION_SECRET;

  if (!isAdmin) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl border border-[#b9975b]/30 bg-[#15120e] p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
            Admin
          </p>

          <h1 className="mt-4 text-4xl font-light text-[#f3eadb]">
            Admin Access
          </h1>

          <p className="mt-4 text-[#efe3cf]/65">
            Enter your admin password to manage bookings and vehicles.
          </p>

          {params.error === 'incorrect' && (
            <p className="mt-4 border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200">
              Password incorrect. Please try again.
            </p>
          )}

          <form action={adminLogin} className="mt-8">
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

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
          Admin
        </p>

        <h1 className="mt-5 text-4xl font-light tracking-wide text-[#f3eadb] md:text-5xl">
          Admin Dashboard
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href="/admin/bookings"
            className="border border-[#b9975b]/30 bg-[#15120e] p-6 transition hover:border-[#b9975b]"
          >
            <h2 className="text-2xl font-light text-[#f3eadb]">
              Manage Bookings
            </h2>
            <p className="mt-3 text-[#efe3cf]/60">
              Approve, decline, cancel, and archive requests.
            </p>
          </Link>

          <Link
            href="/admin/vehicles/new"
            className="border border-[#b9975b]/30 bg-[#15120e] p-6 transition hover:border-[#b9975b]"
          >
            <h2 className="text-2xl font-light text-[#f3eadb]">
              Add Vehicle
            </h2>
            <p className="mt-3 text-[#efe3cf]/60">
              Add your cars or partner-owned vehicles.
            </p>
          </Link>
        </div>

        <form action={adminLogout} className="mt-8">
          <button className="border border-[#efe3cf]/30 px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#efe3cf]/60">
            Log Out
          </button>
        </form>
      </div>
    </section>
  );
}