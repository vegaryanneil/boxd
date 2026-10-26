
export default function MenuFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div
      role="group"
      aria-label="Filter bento boxes by category"
      className="flex flex-wrap gap-3"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onCategoryChange(category)}
            className={`min-h-11 border-2 border-charcoal px-5 py-3 text-sm font-bold uppercase transition-colors ${
              isSelected
                ? "bg-forest text-white"
                : "bg-cream text-charcoal hover:bg-mustard"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
