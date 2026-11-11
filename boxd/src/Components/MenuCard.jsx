
import { useEffect, useRef, useState } from "react";
import AllergenTags from "./AllergenTags";
import { useCart } from "../context/CartContext";
import AddToCartButton from "./AddToCartButton";

export default function MenuCard({ item }) {
  const { cart, addToCart } = useCart();

  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef(null);

  // Find how many of this item are already in the cart.
  const cartItem = cart.find(
    (cartItem) => cartItem.id === item.id
  );

  const quantityInCart = cartItem?.quantity ?? 0;
  const atLimit = quantityInCart >= 20;

  function handleAddToCart() {
    if (atLimit) return;

    addToCart(item);

    // Show immediate confirmation.
    setJustAdded(true);

    // Reset the confirmation timer after each click.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setJustAdded(false);
      timeoutRef.current = null;
    }, 1500);
  }

  // Clean up the timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <article className="flex h-full flex-col border-2 border-charcoal bg-white text-charcoal">
      {/* BENTO IMAGE */}
      <div className="aspect-square overflow-hidden bg-coral">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* NAME AND PRICE */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight md:text-3xl">
            {item.name}
          </h3>

          <span className="shrink-0 bg-mustard px-3 py-2 text-sm font-bold">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-4 leading-relaxed">
          {item.description}
        </p>

        {/* MENU HIGHLIGHTS */}
        {item.tags?.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Menu highlights"
          >
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="bg-forest px-3 py-2 text-xs font-bold uppercase text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* ALLERGEN INFORMATION */}
        <div className="mt-auto pt-4">
          <AllergenTags
            allergenInfo={item.allergenInfo}
          />

  <AddToCartButton item={item} />

        </div>
      </div>
    </article>
  );
}
