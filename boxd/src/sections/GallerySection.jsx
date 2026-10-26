
import { galleryImages } from "../data/Gallery";
import FoodImage from "../Components/FoodImage";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-24 bg-cream px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-forest">
          Feast Your Eyes
        </p>

        <h2
          id="gallery-heading"
          className="font-display text-4xl md:text-6xl"
        >
          THE GOOD STUFF.
        </h2>

        <p className="mt-5 max-w-xl text-lg">
          Good things come in boxes. Take a closer look.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {galleryImages.map((image) => (
            <figure
                key={image.id}
                className={`group relative overflow-hidden bg-coral ${
                image.featured ? "sm:col-span-2" : ""
                }`}
            >
                <div
                className={
                    image.featured
                    ? "aspect-[16/9]"
                    : "aspect-square"
                }
            >
                <FoodImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="800"
                    className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
              </div>

              <figcaption className="absolute bottom-0 left-0 bg-mustard px-4 py-3 font-display text-sm text-charcoal md:text-lg">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
