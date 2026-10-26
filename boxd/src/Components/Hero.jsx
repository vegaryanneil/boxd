
export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-10 md:py-20">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-forest">
            Not your average lunch.
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.02] tracking-tight"
          >
            GOOD FOOD.
            <span className="block text-coral">
              GREAT COMPANY.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed">
            Freshly made bento boxes. Big flavors.
            All packed into one seriously good meal.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#menu"
              className="inline-flex min-h-12 items-center justify-center bg-forest px-6 py-4 text-sm font-bold uppercase text-white transition-colors hover:bg-coral hover:text-charcoal"
            >
              Explore Our Menu ↗
            </a>

            <a
              href="#story"
              className="inline-flex min-h-12 items-center border-b-2 border-charcoal font-bold uppercase transition-colors hover:text-coral"
            >
              Our Story ↗
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-3 z-10 bg-mustard px-4 py-3 font-display text-sm rotate-6 md:text-lg">
            FRESH DAILY!
          </div>

          <div className="aspect-[4/5] overflow-hidden bg-coral md:aspect-square">
            <img
              src="/images/hero-bento.jpg"
              alt="Bento box filled with crispy chicken, rice, and colorful vegetables"
              width="1200"
              height="1200"
              fetchPriority="high"
              className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="border-y-2 border-charcoal bg-mustard px-5 py-5">
        <p className="text-center font-display text-sm uppercase tracking-wide md:text-xl">
          One box. All the good stuff. ✳
        </p>
      </div>
    </section>
  );
}
