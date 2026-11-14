
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[680px] scroll-mt-24 items-center overflow-hidden bg-cream"
    >
      {/* Product image */}
      <div className="absolute inset-0 -z-10 lg:left-[38%]">
        <img
          src="/images/cookie-hero.jpg"
          alt="Chocolate chip cookie with melted chocolate and flaky sea salt"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/85 to-transparent lg:bg-gradient-to-r lg:from-cream lg:via-cream/90 lg:to-transparent" />
      </div>

      {/* Hero content */}
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 md:px-10">
        <div className="max-w-[850px]">
          <p className="mb-6 text-sm font-extrabold tracking-[0.2em]">
            THE CHOCOLATE CHIP COOKIE, PERFECTED.
          </p>

          <h1 className="font-display text-[clamp(3.5rem,8.5vw,9rem)] leading-[0.94] tracking-[-0.075em]">
            ONE
            <br />
            COOKIE.
            <br />
            <span className="relative inline-block">
              DONE RIGHT.
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 -z-10 h-[12%] w-full -rotate-1 bg-butter"
              />
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base font-bold leading-relaxed md:text-lg">
            MELTED BUTTER. ROUGH-CHOPPED CHOCOLATE.
            24 HOURS OF REST. BAKED AT 350°F FOR
            11 MINUTES. FINISHED WITH FLAKY SEA SALT.
          </p>

          <a
            href="#products"
            className="mt-8 inline-flex items-center gap-5 border-2 border-ink bg-butter px-7 py-4 text-lg font-extrabold transition hover:-translate-y-1 hover:shadow-[5px_5px_0_#191715]"
          >
            GET COOKIES
            <ArrowRight size={23} />
          </a>
        </div>
      </div>
    </section>
  );
}
