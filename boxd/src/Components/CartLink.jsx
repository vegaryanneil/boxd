
import { useCart } from "../context/CartContext";

export default function CartLink() {
  const { cartCount } = useCart();

  return (
    <a
      href="#order-cart"
      className="inline-flex min-h-11 items-center gap-2 border-2 border-charcoal bg-mustard px-4 py-2 font-bold text-charcoal focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-forest"
      aria-label={`View cart, ${cartCount} items`}
    >
      CART
      <span aria-hidden="true">({cartCount})</span>
    </a>
  );
}
