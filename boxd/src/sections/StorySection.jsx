
export default function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="scroll-mt-24 bg-forest px-5 py-20 text-cream md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-mustard">
            A Little About Us
          </p>

          <h2
            id="story-heading"
            className="font-display text-4xl leading-tight md:text-6xl"
          >
            GOOD FOOD.
            <span className="block text-mustard">
              NO FUSS.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed">
            We believe a great meal doesn't need to be
            complicated. Just fresh ingredients, bold
            flavors, and a box that brings it all together.
          </p>

          <p className="mt-5 max-w-xl leading-relaxed">
            Inspired by the thoughtful organization of
            Japanese bento and the energy of American
            fast-casual dining, BOXD makes everyday meals
            something to look forward to.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="bg-mustard px-4 py-3 text-sm font-bold uppercase text-charcoal">
              Bento Only
            </span>

            <span className="bg-coral px-4 py-3 text-sm font-bold uppercase text-charcoal">
              Big Energy
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-coral">
            <img
              src="/images/story-bento.jpg"
              alt="A freshly prepared bento box featuring rice, protein, and colorful sides"
              loading="lazy"
              width="800"
              height="1000"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -left-3 rotate-[-5deg] bg-mustard px-5 py-4 font-display text-lg text-charcoal md:text-2xl">
            PACKED WITH GOODNESS!
          </div>
        </div>
      </div>
    </section>
  );
}
