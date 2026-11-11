
import { useCart } from "../context/CartContext";

export default function StickyCartBar() {
  const { cartCount, subtotal } = useCart();

  // Hide the bar when the cart is empty.
  if (cartCount === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Shopping cart summary"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-charcoal bg-forest px-4 py-3 text-white shadow-lg md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4">

        {/* CART SUMMARY */}
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-mustard">
            Your BOXD ({cartCount})
          </p>

          <p className="font-display text-2xl">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        {/* VIEW CART BUTTON */}
        <a
          href="#order-cart"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 border-2 border-charcoal bg-mustard px-5 py-3 font-bold uppercase text-charcoal transition-transform motion-safe:active:scale-95"
        >
          View Cart
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
