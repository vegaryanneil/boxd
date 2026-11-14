
import { useEffect, useRef } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

export default function CartDrawer({
  cart,
  pickupSelection,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      // Keep keyboard focus inside the drawer
      if (event.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-ink/70"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="
          absolute inset-y-0 right-0
          flex h-dvh w-full max-w-md
          flex-col overflow-y-auto
          border-l-2 border-ink
          bg-cream text-ink
          shadow-[-8px_0_0_#191715]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink p-6">
          <h2
            id="cart-title"
            className="font-display text-3xl"
          >
            YOUR CART.
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="
              flex h-11 w-11 items-center
              justify-center border-2 border-ink
              transition hover:bg-butter
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 space-y-6 p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <ShoppingBag size={48} strokeWidth={1.5} />

              <h3 className="font-display text-2xl">
                NOTHING IN HERE.
              </h3>

              <p className="font-bold">
                YOUR CART IS LOOKING A LITTLE EMPTY.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="
                  mt-4 border-2 border-ink
                  bg-butter px-6 py-3
                  font-extrabold transition
                  hover:bg-ink hover:text-cream
                "
              >
                EXPLORE THE COOKIE
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border-b-2 border-ink/20 pb-6"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 shrink-0 object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold">
                      {item.name}
                    </h3>

                    <p className="mt-1 font-bold">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="
                      self-start p-2
                      transition hover:text-red-600
                    "
                  >
                    <Trash2 size={19} />
                  </button>
                </div>

                {/* Quantity and line total */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(quantity) =>
                      onUpdateQuantity(item.id, quantity)
                    }
                  />

                  <span className="font-extrabold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart footer */}
        <div className="sticky bottom-0 border-t-2 border-ink bg-butter p-6">
          <div className="mb-5 flex justify-between gap-3 font-display text-xl">
            <span>SUBTOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <p className="text-sm font-bold leading-relaxed">
            Checkout will be enabled in a future lesson.
            Taxes and fulfillment are not included.
          </p>
          
        {pickupSelection && (
          <div className="mb-4 border-2 border-ink bg-cream p-4">
            <p className="text-xs font-extrabold uppercase">
              Selected pickup
            </p>

            <p className="mt-2 font-bold">
              {pickupSelection.date} at {pickupSelection.time}
            </p>
          </div>
        )}


        <button
          type="button"
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="
            mt-5 flex min-h-14 w-full
            items-center justify-center
            border-2 border-ink bg-ink
            px-6 py-4 font-extrabold
            text-cream transition
            hover:bg-cream hover:text-ink
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          SELECT PICKUP TIME
        </button>


          <button
            type="button"
            onClick={onClose}
            className="
              mt-5 flex min-h-14 w-full
              items-center justify-center
              border-2 border-ink
              bg-cream px-6 py-4
              font-extrabold uppercase
              transition hover:bg-ink
              hover:text-cream
            "
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </aside>
    </div>
  );
}
