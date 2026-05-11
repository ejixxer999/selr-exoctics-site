export default function AboutPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">About SELR</p>
          <h1 className="mt-5 text-5xl font-light tracking-wide text-[#f3eadb]">A classic standard of arrival.</h1>
        </div>

        <div className="space-y-7 text-lg leading-9 text-[#efe3cf]/70">
          <p>
            SELR Exotics was created for people who understand that a vehicle is more than transportation. It is atmosphere, story, and presence.
          </p>
          <p>
            Our service focuses on classic and exotic vehicles for weddings, private events, editorial shoots, film productions, and curated chauffeured experiences.
          </p>
          <p>
            We value professionalism, presentation, and careful coordination, making sure each booking feels refined from first inquiry to final delivery.
          </p>
        </div>
      </div>
    </section>
  );
}