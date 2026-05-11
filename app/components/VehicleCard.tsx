import Image from "next/image";

interface VehicleCardProps {
  vehicle: {
    name: string;
    subtitle: string;
    image: string;
    description: string;
    features: string[];
  };
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <article className="grid overflow-hidden border border-[#b9975b]/30 bg-[#15120e] md:grid-cols-2">
      <div className="relative min-h-[320px]">
        <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-[#b9975b]">Featured Motorcar</p>
        <h2 className="mt-4 text-3xl font-light tracking-wide text-[#f3eadb] md:text-5xl">{vehicle.name}</h2>
        <p className="mt-3 text-lg text-[#efe3cf]/70">{vehicle.subtitle}</p>
        <p className="mt-6 leading-8 text-[#efe3cf]/70">{vehicle.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {vehicle.features.map((feature) => (
            <span key={feature} className="border border-[#b9975b]/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#efe3cf]/70">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}