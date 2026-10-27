
import {
  ALLERGENS,
  ALLERGEN_STATUS,
} from "../data/allergens";

export default function AllergenTags({
  allergenInfo,
}) {
  const {
    status = ALLERGEN_STATUS.PENDING,
    contains = [],
    crossContact = [],
    crossContactNote = "",
    reviewedAt = null,
  } = allergenInfo ?? {};

  const isVerified =
    status === ALLERGEN_STATUS.VERIFIED;

  // Do not show unverified ingredient claims.
  if (!isVerified) {
    return (
      <div
        className="mt-4 border-2 border-forest bg-cream p-3 text-charcoal"
        aria-label="Allergen information"
      >
        <p className="text-sm font-bold">
          Allergen information pending verification
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          Please contact our team before ordering
          if you have food allergies.
        </p>
      </div>
    );
  }

  const renderTags = (keys) => (
    <ul className="mt-2 flex flex-wrap gap-2">
      {keys.map((key) => (
        <li
          key={key}
          className="border-2 border-charcoal bg-cream px-3 py-2 text-sm font-bold text-charcoal"
        >
          {ALLERGENS[key]?.label ?? key}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="mt-4 space-y-4 text-charcoal"
      aria-label="Allergen information"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-wide">
          Contains
        </p>

        {contains.length > 0 ? (
          renderTags(contains)
        ) : (
        <p className="mt-2 text-sm">
            No allergens are listed in the current
            ingredient review. This does not
            guarantee an allergen-free meal.
        </p>
        )}
      </div>

      <div className="border-l-4 border-charcoal bg-mustard p-3">
        <p className="text-sm font-bold uppercase">
          Cross-contact information
        </p>

        {crossContact.length > 0 && (
          renderTags(crossContact)
        )}

        <p className="mt-2 text-sm leading-relaxed">
          {crossContactNote ||
            "Cross-contact information has not been established. Please ask our team before ordering."}
        </p>
      </div>

      <p className="text-xs text-forest">
        Ingredient information reviewed
        {reviewedAt ? `: ${reviewedAt}` : "."}
        {" "}Please inform our team of food allergies
        before ordering.
      </p>
    </div>
  );
}
