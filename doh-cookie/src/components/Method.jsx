
const steps = [
  {
    number: "01",
    title: "MELTED BUTTER.",
    description:
      "Our foundation for rich flavor and a soft, chewy center.",
    image: "/images/melted-butter.jpg",
  },
  {
    number: "02",
    title: "ROUGH-CHOPPED CHOCOLATE.",
    description:
      "Irregular chocolate chunks create melty pockets in every bite.",
    image: "/images/chopped-chocolate.jpg",
  },
  {
    number: "03",
    title: "24-HOUR REST.",
    description:
      "We give our dough a full day to develop deeper flavor.",
    image: "/images/cookie-dough-scoop.jpg",
  },
  {
    number: "04",
    title: "350°F. 11 MINUTES.",
    description:
      "Our precise bake creates crispy edges and a soft center.",
    image: "/images/oven.jpg",
  },
  {
    number: "05",
    title: "FLAKY SEA SALT.",
    description:
      "The finishing touch that balances the sweetness.",
    image: "/images/flaky-salt.jpg",
  },
];

export default function Method() {
  return (
    <section
      id="method"
      className="scroll-mt-24 border-b-2 border-ink bg-cream px-5 py-20 md:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <div>
            <p className="mb-4 text-sm font-extrabold tracking-widest">
              THE SECRET IS NO SECRET.
            </p>

            <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              THE
              <br />
              METHOD.
            </h2>
          </div>

          <div className="grid gap-8 border-t-2 border-ink pt-8 sm:grid-cols-2 lg:grid-cols-5 lg:border-l-2 lg:border-t-0 lg:pl-8 lg:pt-0">
            {steps.map((step) => (
              <article key={step.number}>
                <span className="font-display text-4xl">
                  {step.number}
                </span>

                <div className="my-5 aspect-square overflow-hidden bg-dough/20">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>

                <h3 className="font-display text-lg leading-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-relaxed">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
