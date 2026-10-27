
export const ALLERGENS = {
  milk: { label: "Milk", major: true },
  eggs: { label: "Eggs", major: true },
  fish: { label: "Fish", major: true },
  shellfish: { label: "Crustacean Shellfish", major: true },
  treeNuts: { label: "Tree Nuts", major: true },
  peanuts: { label: "Peanuts", major: true },
  wheat: { label: "Wheat", major: true },
  soy: { label: "Soybeans", major: true },
  sesame: { label: "Sesame", major: true },

  // Additional dietary concern; not a separate
  // major U.S. allergen category.
  gluten: { label: "Gluten", major: false },
};

export const ALLERGEN_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
};

export const allergenLabels = (keys = []) =>
  keys.map((key) => ALLERGENS[key]?.label ?? key);
