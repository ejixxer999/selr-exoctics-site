import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/availability", label: "Availability" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#b9975b]/30 bg-[#0f0c08]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <Link href="/" className="text-lg tracking-[0.35em] text-[#f3eadb]">
          SELR
        </Link>

        <div className="flex max-w-full gap-5 overflow-x-auto pb-2 md:gap-8 md:overflow-visible md:pb-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-xs uppercase tracking-[0.18em] text-[#efe3cf]/80 transition hover:text-[#b9975b] md:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}