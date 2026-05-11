import Link from "next/link"

const links =[
    { href: "/", label: "Home" },
    { href: "/fleet", label: "Fleet" },
    { href: "/availability", label: "Availability" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },

];

export default function Navbar() {
    return(
        <header className="sticky top-0 z-50 border-b border-[#b9975b]/30 bg-[#0f0c08] backdrop-blur">
            <nav className="mx-auto flex max-w-7x1 items-center justify-between px-6 py-5">
                <Link href="/" className="text-xl tracking-[0.35em] text-[#f3eadb]">
                SELR
                </Link>
                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <Link 
                        key={link.href}
                        href={link.href}
                        className="text-sm uppercase tracking-[0.18em] text-[#efecf]/80 transition hover:text-[#b9975b]">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>

        </header>
    );
}