
import { restaurant } from "../data/restaurant";

export default function VisitSection() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="scroll-mt-24 bg-mustard px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-forest">
            Your Next Favorite Lunch Spot
          </p>

          <h2
            id="visit-heading"
            className="font-display text-5xl leading-tight text-charcoal md:text-7xl"
          >
            COME
            <span className="block">HUNGRY.</span>
          </h2>

          <p className="mt-7 max-w-md text-lg">
            Fresh boxes. Friendly faces. Good times.
            We're bringing big bento energy to Raleigh.
          </p>

          <a
            href="#menu"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-forest px-6 py-4 text-sm font-bold uppercase text-white transition-colors hover:bg-coral hover:text-charcoal"
          >
            Explore The Menu ↗
          </a>
        </div>

        <div className="border-2 border-charcoal bg-cream p-6 md:p-8">
          <h3 className="font-display text-2xl md:text-3xl">
            FIND YOUR BOXD.
          </h3>

          <div className="mt-7 border-b border-charcoal/30 pb-6">
            <h4 className="font-bold uppercase">
              Location
            </h4>

            <p className="mt-2">{restaurant.city}</p>

            {restaurant.address ? (
              <address className="mt-1 not-italic">
                {restaurant.address}
              </address>
            ) : (
              <p className="mt-1 text-sm text-forest">
                Exact location coming soon.
              </p>
            )}
          </div>

          <div className="mt-6 border-b border-charcoal/30 pb-6">
            <h4 className="font-bold uppercase">
            {restaurant.hoursAreVerified
                ? "Opening Hours"
                : "Proposed Hours"}
            </h4>

            <dl className="mt-4 space-y-3">
              {restaurant.hours.map((entry) => (
                <div
                  key={entry.days}
                  className="flex flex-wrap justify-between gap-2"
                >
                  <dt className="font-medium">
                    {entry.days}
                  </dt>
                  <dd>{entry.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6">
            <h4 className="font-bold uppercase">
              Get In Touch
            </h4>

            {restaurant.email ? (
              <a
                href={`mailto:${restaurant.email}`}
                className="mt-3 inline-block font-bold underline underline-offset-4"
              >
                {restaurant.email}
              </a>
            ) : (
              <p className="mt-3 text-sm text-forest">
                Contact information coming soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
