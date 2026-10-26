
import { useState } from "react";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit Us", href: "#visit" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-charcoal bg-cream">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="font-display text-3xl tracking-tighter"
        >
          BOXD.
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase transition-colors hover:text-coral"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#menu"
          className="hidden bg-forest px-5 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-coral hover:text-charcoal md:inline-flex"
        >
          View Menu ↗
        </a>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(!isOpen)}
          className="flex min-h-11 min-w-11 items-center justify-center border-2 border-charcoal text-xl md:hidden"
        >
          <span aria-hidden="true">
            {isOpen ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t-2 border-charcoal bg-cream md:hidden"
        >
          <div className="flex flex-col px-5 py-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-charcoal/20 py-4 text-xl font-bold uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
