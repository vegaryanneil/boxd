
import { useState } from "react";
import { Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";

export default function Navbar({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  function handleOpenCart() {
  console.log("Navbar: Cart clicked");
  setMenuOpen(false);
  onOpenCart();
}

  const links = [
    { label: "THE COOKIE", href: "#products" },
    { label: "THE METHOD", href: "#method" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#home"
          className="font-display text-4xl tracking-[-0.08em] md:text-5xl"
          aria-label="DOH home"
        >
          DOH.
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-extrabold transition-colors hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>

<div className="hidden items-center gap-3 md:flex">
  <a
    href="#products"
    className="flex items-center gap-2 border-2 border-ink bg-butter px-7 py-3 font-extrabold"
  >
    ORDER <ArrowUpRight size={19} />
  </a>

  <button
    type="button"
    onClick={handleOpenCart}
    aria-label={`Open shopping cart with ${cartCount} items`}
    className="flex items-center gap-2 border-2 border-ink bg-cream px-4 py-3 font-extrabold"
  >
    <ShoppingBag size={20} />
    {cartCount}
  </button>
</div>


        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="p-2 md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="flex flex-col gap-5 border-t-2 border-ink bg-cream px-5 py-6 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-extrabold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#products"
            onClick={() => setMenuOpen(false)}
            className="w-fit border-2 border-ink bg-butter px-6 py-3 font-extrabold"
          >
            ORDER
          </a>
        
<button
  type="button"
  onClick={handleOpenCart}
  aria-label={`Open shopping cart with ${cartCount} items`}
  className="
    relative z-50
    flex h-11 items-center
    justify-center gap-2
    border-2 border-ink
    bg-butter px-4
    font-bold
    cursor-pointer
    transition hover:bg-cream
  "
>
  <ShoppingBag size={20} />

  <span>CART ({cartCount})</span>
</button>

        </div>
      )}
    </header>
  );
}
