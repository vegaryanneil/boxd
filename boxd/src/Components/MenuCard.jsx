
import AllergenTags from "./AllergenTags";

export default function MenuCard({ item }) {
  return (
    <article className="flex h-full flex-col overflow-hidden border-2 border-charcoal bg-white text-charcoal">
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
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight md:text-3xl">
            {item.name}
          </h3>

          <span className="shrink-0 bg-mustard px-3 py-2 text-sm font-bold">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-4 leading-relaxed">
          {item.description}
        </p>

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

        <div className="mt-auto pt-4">
          <AllergenTags
            allergenInfo={item.allergenInfo}
          />
        </div>
      </div>
    </article>
  );
}
