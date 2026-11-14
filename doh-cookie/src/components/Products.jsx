
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/products";

export default function Products({ onSelectProduct }) {
  function handleQuickView(product) {
    console.log("Quick View clicked:", product);

    if (typeof onSelectProduct !== "function") {
      console.error(
        "Products: onSelectProduct is missing or not a function."
      );
      return;
    }

    onSelectProduct(product);
  }

  return (
    <section
      id="products"
      className="scroll-mt-24 bg-cream px-3 py-4 md:px-5"
    >
      <div className="mx-auto grid max-w-[1600px] gap-3 lg:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.id}
            className={`
              relative isolate flex min-h-[360px]
              flex-col justify-between
              overflow-hidden border-2 border-ink
              p-6 sm:p-9
              ${product.background}
            `}
          >
            {/* Product image */}
            <img
              src={product.image}
              alt=""
              loading="lazy"
              className="
                pointer-events-none
                absolute right-0 top-1/2
                -z-10
                h-auto max-h-[90%] w-1/3
                -translate-y-1/2
                object-contain
              "
            />

            {/* Product information */}
            <div className="relative z-10 max-w-[65%]">
              <p className="mb-4 text-xs font-extrabold tracking-widest">
                {product.label}
              </p>

              <h2 className="font-display text-4xl leading-none tracking-tight sm:text-5xl xl:text-6xl">
                {product.title}
              </h2>

              <p className="mt-6 max-w-[300px] text-sm font-extrabold leading-relaxed">
                {product.description}
              </p>

              <p className="mt-5 font-display text-2xl">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Quick View button */}
            <button
              type="button"
              onClick={() => handleQuickView(product)}
              aria-label={`Quick view ${product.name}`}
              className="
                relative z-20 ml-auto
                flex h-14 w-14 shrink-0
                items-center justify-center
                border-2 border-ink bg-cream
                transition-all duration-200
                hover:-translate-y-1
                hover:bg-butter
                hover:shadow-[4px_4px_0_#191715]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-ink
              "
            >
             
<button
  type="button"
  onClick={(event) => {
    event.stopPropagation();

    onSelectProduct(product);
  }}
  className="
    relative z-50
    ml-auto flex h-14 w-14
    items-center justify-center
    border-2 border-black
    bg-white text-black
    cursor-pointer
  "
>
  <ArrowUpRight size={28} />
</button>

            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
