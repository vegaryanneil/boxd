
export default function MenuCard({ item }) {
  return (
    <article className="group overflow-hidden border-2 border-charcoal bg-cream">
      <div className="aspect-square overflow-hidden bg-coral">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight md:text-2xl">
            {item.name}
          </h3>

          <span className="shrink-0 font-bold">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-forest">
          {item.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="border border-forest px-3 py-1 text-xs font-bold uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
