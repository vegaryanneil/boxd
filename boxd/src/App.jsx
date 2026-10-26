
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MenuSection from "./sections/MenuSection";
import StorySection from "./sections/StorySection";
import GallerySection from "./sections/GallerySection";
import VisitSection from "./sections/VisitSection";

function App() {
  return (
    <>
        <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed
        focus:left-4 focus:top-4 focus:z-[100]
        focus:bg-mustard focus:px-5 focus:py-3
        focus:font-bold focus:text-charcoal
        focus-visible:outline-mustard
        "
    >
      Skip to main content
    </a>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <MenuSection />
        <StorySection />
        <GallerySection />
        <VisitSection />
      </main>

      <footer className="bg-forest px-5 py-12 text-cream md:px-10">
        <div className="mx-auto max-w-7xl">
          <a
            href="#home"
            className="font-display text-6xl md:text-9xl"
          >
            BOXD.
          </a>

          <p className="mt-4">
            BIG FLAVOR. NEATLY PACKED.
          </p>

          <p className="mt-8 text-sm">
            © {new Date().getFullYear()} BOXD.
            Fictional restaurant concept.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
