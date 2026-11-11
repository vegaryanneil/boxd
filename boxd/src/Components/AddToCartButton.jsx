
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import "./AddToCartButton.css";

const confetti = [
  { x: -100, y: -65, color: "#FF7043", round: true },
  { x: -60, y: -100, color: "#294B3B" },
  { x: 10, y: -110, color: "#F4BE46", round: true },
  { x: 100, y: -75, color: "#FF7043" },
  { x: 115, y: 25, color: "#294B3B", round: true },
  { x: 65, y: 80, color: "#F4BE46" },
  { x: -85, y: 75, color: "#FF7043", round: true },
];

export default function AddToCartButton({ item }) {
  const { cart, addToCart } = useCart();

  const [justAdded, setJustAdded] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const timeoutRef = useRef(null);

  const cartItem = cart.find(
    (cartItem) => cartItem.id === item.id
  );

  const quantity = cartItem?.quantity ?? 0;
  const atLimit = quantity >= 20;

  function handleAdd() {
    if (atLimit) return;

    addToCart(item);
    setJustAdded(true);
    setBurstKey((key) => key + 1);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="mt-5 w-full">
      <div className="boxd-add-wrap">
        {justAdded && (
          <div
            key={burstKey}
            className="boxd-confetti"
            aria-hidden="true"
          >
            {confetti.map((piece, index) => (
              <span
                key={index}
                className="boxd-confetti-piece"
                style={{
                  "--x": `${piece.x}px`,
                  "--y": `${piece.y}px`,
                  "--piece-color": piece.color,
                  "--radius": piece.round ? "50%" : "0",
                  "--delay": `${index * 20}ms`,
                }}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={atLimit}
          className={`boxd-add-button ${
            justAdded ? "boxd-added" : ""
          }`}
        >
          {atLimit
            ? "MAXIMUM QUANTITY REACHED"
            : justAdded
              ? "✓ BOXD & READY!"
              : quantity > 0
                ? `+ ADD ANOTHER — ${quantity} IN CART`
                : `+ ADD TO ORDER — $${item.price.toFixed(2)}`}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 min-h-5 text-center text-sm font-bold text-forest"
      >
        {quantity > 0
          ? `${quantity} ${quantity === 1 ? "BOX" : "BOXES"} IN YOUR CART`
          : ""}
      </p>
    </div>
  );
}
