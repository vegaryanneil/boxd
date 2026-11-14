
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
}) {
  return (
    <div className="inline-flex items-center border-2 border-ink">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-12 w-12 items-center justify-center disabled:opacity-30"
      >
        <Minus size={18} />
      </button>

      <span
        className="min-w-12 text-center font-extrabold"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="flex h-12 w-12 items-center justify-center"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
