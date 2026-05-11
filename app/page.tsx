import Link from "next/link";
import VehicleCard from "./components/VehicleCard";
import { vehicles } from "./data/vehicles";

export default function HomePage() {
  return (
    <div>
      <section className="relative flex min-h-[85vh] items-center border-b border-[#b9975b]/20 bg-[radial-gradient(circle_at_top,#2a2118,#0f0c08_55%)] px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.45em] text-[#b9975b]">Classic Motorcar Experiences</p>
          <h1 className="mt-6 max-w-5xl text-4xl font-light leading-tight tracking-wide text-[#f3eadb] sm:text-5xl md:text-7xl">
            Distinguished classic car rentals for unforgettable arrivals.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#efe3cf]/70">
            SELR Exotics provides timeless vehicles for weddings, photoshoots, video productions, private events, and chauffeured experiences.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/fleet" className="border border-[#b9975b] bg-[#b9975b] px-8 py-4 text-center text-sm uppercase tracking-[0.25em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]">
              View Fleet
            </Link>
            <Link href="/availability" className="border border-[#b9975b]/60 px-8 py-4 text-center text-sm uppercase tracking-[0.25em] text-[#efe3cf] transition hover:border-[#b9975b] hover:text-[#b9975b]">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <VehicleCard vehicle={vehicles[0]} />
        </div>
      </section>

      <section className="border-y border-[#b9975b]/20 bg-[#15120e] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          {[
            ["01", "Photo & Film Props", "Deliver a classic visual centerpiece for editorials, music videos, branded shoots, and productions."],
            ["02", "Weddings & Arrivals", "Arrive with old-world presence and timeless style for ceremonies, receptions, and special occasions."],
            ["03", "Chauffeured Experiences", "Enjoy the vehicle with a professional driver for select local events and private experiences."],
          ].map(([number, title, body]) => (
            <div key={title} className="border-l border-[#b9975b]/40 pl-6">
              <p className="text-sm tracking-[0.3em] text-[#b9975b]">{number}</p>
              <h3 className="mt-4 text-2xl font-light text-[#f3eadb]">{title}</h3>
              <p className="mt-4 leading-7 text-[#efe3cf]/60">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}