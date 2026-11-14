
import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function Checkout({
  cart,
  pickupSelection,
  onBack,
  onPlaceOrder,
}) {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!customer.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!customer.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!customer.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!pickupSelection || cart.length === 0) {
      setError("Your order needs items and a pickup time.");
      return;
    }

    onPlaceOrder({
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      pickup: pickupSelection,
      subtotal,
    });
  }

  return (
    <div className="mx-auto max-w-3xl border-2 border-ink bg-cream">
      <div className="border-b-2 border-ink bg-butter p-6 sm:p-10">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 font-extrabold"
        >
          <ArrowLeft size={20} />
          BACK TO CART
        </button>

        <p className="text-xs font-extrabold tracking-widest">
          DOH. / CHECKOUT
        </p>

        <h2 className="mt-3 font-display text-4xl sm:text-6xl">
          ALMOST COOKIE TIME.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
        <section className="space-y-4">
          <h3 className="font-display text-2xl">
            YOUR DETAILS.
          </h3>

          <label className="block font-bold">
            Full name
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              value={customer.name}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-ink bg-white p-3"
            />
          </label>

          <label className="block font-bold">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={customer.email}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-ink bg-white p-3"
            />
          </label>

          <label className="block font-bold">
            Phone number
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={customer.phone}
              onChange={handleChange}
              className="mt-2 w-full border-2 border-ink bg-white p-3"
            />
          </label>
        </section>

        <section className="border-t-2 border-ink pt-6">
          <h3 className="mb-4 font-display text-2xl">
            YOUR PICKUP.
          </h3>

          <p className="font-bold">
            {pickupSelection?.date || "No date selected"}
            {" at "}
            {pickupSelection?.time || "No time selected"}
          </p>
        </section>

        <section className="border-t-2 border-ink pt-6">
          <div className="mb-5 flex items-center gap-2">
            <ShoppingBag size={22} />
            <h3 className="font-display text-2xl">
              YOUR ORDER.
            </h3>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 font-bold"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t-2 border-ink pt-5 font-display text-xl">
            <span>SUBTOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <p className="mt-3 text-sm font-bold">
            Prototype only. Taxes and payment are not
            processed.
          </p>
        </section>

        {error && (
          <p role="alert" className="font-bold text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={cart.length === 0 || !pickupSelection}
          className="min-h-14 w-full border-2 border-ink bg-ink px-6 py-4 font-extrabold text-cream transition hover:bg-butter hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          PLACE TEST ORDER
        </button>
      </form>
    </div>
  );
}
