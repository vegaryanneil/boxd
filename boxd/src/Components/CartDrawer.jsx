
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <section
      id="order-cart"
      aria-labelledby="cart-heading"
      className="scroll-mt-24 bg-mustard px-5 py-16 md:px-10"
    >
      <div className="mx-auto max-w-4xl border-2 border-charcoal bg-cream p-5 text-charcoal md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="cart-heading"
            className="font-display text-3xl md:text-5xl"
          >
            YOUR BOXD.
          </h2>

          <span className="bg-forest px-4 py-2 font-bold text-white">
            {cartCount} {cartCount === 1 ? "Item" : "Items"}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="mt-8 border-t-2 border-charcoal pt-8">
            <p>Your cart is empty.</p>
            <a
              href="#menu"
              className="mt-4 inline-block font-bold underline underline-offset-4"
            >
              Explore the menu
            </a>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y-2 divide-charcoal">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-24 w-24 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm">
                      ${item.price.toFixed(2)} each
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="min-h-11 min-w-11 border-2 border-charcoal font-bold disabled:opacity-40"
                      >
                        −
                      </button>

                      <span
                        aria-label={`${item.quantity} ${item.name} in cart`}
                        className="font-bold"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        disabled={item.quantity >= 20}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="min-h-11 min-w-11 border-2 border-charcoal font-bold disabled:opacity-40"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="min-h-11 px-2 text-sm font-bold underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-bold">
                    ${(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t-2 border-charcoal pt-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold uppercase">
                  Subtotal
                </span>

                <span className="font-display text-3xl">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <p className="mt-3 text-sm">
                Taxes and fees are not included.
                Pickup scheduling and demo checkout
                will be added in later lessons.
              </p>

              <p className="mt-3 text-sm">
                Allergen information is pending
                verification. Please review ingredient
                information before placing a real order.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled
                  className="min-h-12 flex-1 bg-forest px-6 py-4 font-bold uppercase text-white opacity-60"
                >
                  Checkout — Coming Soon
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="min-h-12 border-2 border-charcoal px-5 py-4 font-bold uppercase"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
