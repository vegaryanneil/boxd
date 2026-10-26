
import { useState } from "react";
import { categories, menuItems } from "../data/menu";
import MenuCard from "../Components/MenuCard";
import MenuFilter from "../Components/MenuFilter";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] =
    useState("All Boxes");

  const filteredItems =
    selectedCategory === "All Boxes"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === selectedCategory
        );
        

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="scroll-mt-24 border-b-2 border-charcoal px-5 py-20 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-forest">
          Freshly packed. Seriously good.
        </p>

        <h2
          id="menu-heading"
          className="font-display text-5xl md:text-7xl"
        >
          THE LINEUP.
        </h2>

        <p className="mt-5 max-w-xl text-lg">
          One box. All the good stuff. Pick your flavor.
        </p>

        <div className="mt-10">
          <MenuFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <p 

            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mt-6 text-sm text-forest"
        >
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "box" : "boxes"}
            {selectedCategory !== "All Boxes"
                ? ` in ${selectedCategory}`
                : " across all categories"}
        </p>

        {filteredItems.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-lg">
            No boxes found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
