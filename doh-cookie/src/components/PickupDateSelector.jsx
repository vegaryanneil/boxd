
import { CalendarDays } from "lucide-react";

export default function PickupDateSelector({
  dates,
  selectedDate,
  onSelectDate,
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays size={20} />

        <h3 className="font-extrabold uppercase">
          Choose your date
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {dates.map((date) => {
          const isSelected = selectedDate === date.value;

          return (
            <button
              key={date.value}
              type="button"
              onClick={() => onSelectDate(date.value)}
              aria-pressed={isSelected}
              className={`
                min-h-16 border-2 border-ink
                px-3 py-4 text-sm font-extrabold
                transition
                ${
                  isSelected
                    ? "bg-butter"
                    : "bg-cream hover:bg-butter/40"
                }
              `}
            >
              {date.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
