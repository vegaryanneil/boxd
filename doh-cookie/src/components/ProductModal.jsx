
import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  // Close modal when Escape is pressed
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function handleAddToCart() {
    onAddToCart(product, quantity);
    onClose();
  }

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/75 p-4
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="
          relative grid w-full max-w-4xl
          max-h-[90dvh] overflow-y-auto
          border-2 border-ink bg-cream
          shadow-[8px_8px_0_#191715]
          md:grid-cols-2
        "
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="
            absolute right-4 top-4 z-20
            flex h-11 w-11 items-center
            justify-center border-2 border-ink
            bg-cream transition hover:bg-butter
          "
        >
          <X size={24} />
        </button>

        {/* Product image */}
        <div
          className={`
            flex min-h-[280px] items-center
            justify-center p-8
            ${product.background}
          `}
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[340px] w-full object-contain"
          />
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-widest">
            {product.label}
          </p>

          <h2
            id="product-modal-title"
            className="font-display text-4xl leading-none sm:text-5xl"
          >
            {product.title}
          </h2>

          <p className="mt-5 text-base leading-relaxed">
            {product.description}
          </p>

          <p className="mt-6 font-display text-3xl">
            ${product.price.toFixed(2)}
          </p>

          {/* Quantity selector */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold uppercase">
              Quantity
            </p>

            <div className="flex w-fit items-center border-2 border-ink">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                disabled={quantity === 1}
                aria-label="Decrease quantity"
                className="
                  flex h-12 w-12 items-center
                  justify-center hover:bg-butter
                  disabled:opacity-40
                "
              >
                <Minus size={20} />
              </button>

              <span className="w-12 text-center font-bold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
                className="
                  flex h-12 w-12 items-center
                  justify-center hover:bg-butter
                "
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="
              mt-8 flex min-h-14 w-full
              items-center justify-between
              border-2 border-ink
              bg-butter px-5 py-4
              font-extrabold uppercase
              transition hover:bg-ink
              hover:text-cream
            "
          >
            <span className="flex items-center gap-3">
              <ShoppingBag size={20} />
              Add to cart
            </span>

            <span>
              ${(product.price * quantity).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
