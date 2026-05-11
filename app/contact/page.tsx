export default function ContactPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b9975b]">Inquiries</p>
          <h1 className="mt-5 text-5xl font-light tracking-wide text-[#f3eadb]">Reserve the experience.</h1>
          <p className="mt-6 max-w-xl leading-8 text-[#efe3cf]/65">
            Tell us about your date, location, event type, and desired vehicle. We will confirm availability and provide the next steps.
          </p>

          <div className="mt-10 space-y-4 text-[#efe3cf]/70">
            <p>Email: bookings@selrexotics.com</p>
            <p>Service Area: New Jersey / New York region</p>
            <p>Use Cases: Weddings, photoshoots, film, private events, chauffeured service</p>
          </div>
        </div>

        <form className="border border-[#b9975b]/30 bg-[#15120e] p-8">
          <div className="grid gap-5">
            <input className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" placeholder="Name" />
            <input className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" placeholder="Email" />
            <input className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" placeholder="Event Date" />
            <input className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" placeholder="Event Location" />
            <textarea className="min-h-40 border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" placeholder="Tell us about your event" />
            <button type="button" className="border border-[#b9975b] bg-[#b9975b] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]">
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}