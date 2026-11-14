
const highlights = [
  "24 HOUR REST",
  "350°F",
  "11 MINUTES",
  "FLAKY SEA SALT",
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y-2 border-ink bg-butter py-4"
      aria-label={highlights.join(", ")}
    >
      <div
        aria-hidden="true"
        className="marquee-track flex w-max items-center"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
          >
            {highlights.map((item) => (
              <div
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-8 pr-8"
              >
                <span className="whitespace-nowrap font-display text-xl md:text-2xl">
                  {item}
                </span>
                <span className="text-xl" aria-hidden="true">
                  ●
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
