
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmation({
  order,
  onDone,
}) {
  if (!order) return null;

  return (
    <div className="mx-auto max-w-2xl border-2 border-ink bg-cream p-8 text-center sm:p-12">
      <CheckCircle2
        size={64}
        className="mx-auto mb-6 text-ink"
      />

      <p className="font-extrabold tracking-widest">
        DOH. / TEST ORDER
      </p>

      <h2 className="mt-4 font-display text-4xl sm:text-6xl">
        COOKIE TIME.
      </h2>

      <p className="mt-5 font-bold">
        Your simulated order has been created.
      </p>

      <div className="mt-8 border-2 border-ink bg-butter p-6">
        <p className="text-xs font-extrabold">
          TEST ORDER NUMBER
        </p>

        <p className="mt-2 font-display text-3xl">
          {order.id}
        </p>
      </div>

      <div className="mt-6 space-y-2 text-left font-bold">
        <p>Customer: {order.customer.name}</p>
        <p>
          Pickup: {order.pickup.date} at {order.pickup.time}
        </p>
        <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
      </div>

      <p className="mt-6 text-sm font-bold">
        No payment was collected and no order was sent
        to a business.
      </p>

      <button
        type="button"
        onClick={onDone}
        className="mt-8 min-h-14 w-full border-2 border-ink bg-ink px-6 py-4 font-extrabold text-cream"
      >
        BACK TO DOH.
      </button>
    </div>
  );
}
