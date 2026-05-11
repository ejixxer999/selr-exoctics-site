import VehicleCard from "../components/VehicleCard";
import { vehicles } from "../data/vehicles";

export default function FleetPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">The Fleet</p>
        <h1 className="mt-5 text-5xl font-light tracking-wide text-[#f3eadb]">Available Motorcars</h1>
        <p className="mt-6 max-w-2xl leading-8 text-[#efe3cf]/65">
          Each vehicle is selected for presence, character, and its ability to transform an ordinary setting into something memorable.
        </p>

        <div className="mt-14 space-y-10">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.name} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}