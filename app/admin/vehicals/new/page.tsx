import { createVehicle } from "./actions";

interface PageProps {
  searchParams: Promise<{
    password?: string;
  }>;
}

export default async function NewVehiclePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const submittedPassword = params.password || "";
  const correctPassword = process.env.ADMIN_PASSWORD || "";

  const passwordWasSubmitted = Boolean(submittedPassword);
  const isAdmin = submittedPassword === correctPassword;

  if (!isAdmin) {
    return (
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl border border-[#b9975b]/30 bg-[#15120e] p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">
            Admin
          </p>

          <h1 className="mt-4 text-4xl font-light text-[#f3eadb]">
            Vehicle Access
          </h1>

          <p className="mt-4 text-[#efe3cf]/65">
            Enter the admin password to add a vehicle.
          </p>

          {passwordWasSubmitted && !isAdmin && (
            <p className="mt-4 border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200">
              Password incorrect. Please try again.
            </p>
          )}

          <form method="GET" className="mt-8">
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
          Add Vehicle
        </h1>

        <p className="mt-6 max-w-2xl leading-8 text-[#efe3cf]/65">
          Add your own cars or vehicles owned by partners. Owner information stays private and is only for admin use.
        </p>

        <form
          action={createVehicle}
          className="mt-10 grid gap-5 border border-[#b9975b]/30 bg-[#15120e] p-5 md:p-8"
        >
          <input type="hidden" name="admin_password" value={submittedPassword} />

          <div className="grid gap-5 md:grid-cols-3">
            <input
              name="year"
              type="number"
              placeholder="Year"
              className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />

            <input
              name="make"
              required
              placeholder="Make"
              className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />

            <input
              name="model"
              required
              placeholder="Model"
              className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />
          </div>

          <input
            name="name"
            required
            placeholder="Display Name, ex: 1972 Jaguar XJ6"
            className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
          />

          <input
            name="subtitle"
            placeholder="Subtitle"
            className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
          />

          <input
            name="image_url"
            placeholder="Image path or URL, ex: /jaguar-xj6.jpg"
            className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
          />

          <textarea
            name="description"
            placeholder="Vehicle description"
            className="min-h-36 border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
          />

          <input
            name="features"
            placeholder="Features separated by commas, ex: Weddings, Photoshoots, Chauffeur available"
            className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
          />

          <div className="mt-6 border-t border-[#b9975b]/20 pt-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b9975b]">
              Owner Info
            </p>

            <p className="mt-2 text-sm text-[#efe3cf]/50">
              Private. Not shown publicly.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <input
              name="owner_name"
              placeholder="Owner Name"
              className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />

            <input
              name="owner_email"
              type="email"
              placeholder="Owner Email"
              className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />

            <input
              name="owner_phone"
              placeholder="Owner Phone"
              className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
            />
          </div>

          <textarea
            name="owner_notes"
            placeholder="Private owner notes, commission, availability notes, restrictions, etc."
            className="min-h-28 border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
          />

          <button
            type="submit"
            className="border border-[#b9975b] bg-[#b9975b] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </section>
  );
}
