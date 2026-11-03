
import { useState } from "react";
import { usePickup } from "../context/PickUpContext";
import {
  getPickupDates,
  getPickupSlots,
  fromDateKey,
} from "../utils/pickupSlots";

export default function PickupScheduler() {
  const {
    pickupDate,
    pickupTime,
    chooseDate,
    chooseTime,
  } = usePickup();

  const [now] = useState(() => new Date());

  const dates = getPickupDates(now);
  const slots = getPickupSlots(pickupDate, now);

  const selectedDate = pickupDate
    ? fromDateKey(pickupDate)
    : null;

  const selectedSlot = slots.find(
    (slot) => slot.value === pickupTime
  );

  return (
    <section
      aria-labelledby="pickup-heading"
      className="mt-8 border-t-2 border-charcoal pt-8"
    >
      <h3
        id="pickup-heading"
        className="font-display text-2xl md:text-3xl"
      >
        SCHEDULE YOUR PICKUP
      </h3>

      <p className="mt-3 text-sm leading-relaxed">
        Choose your preferred pickup date and time.
        Allow at least 60 minutes for preparation.
      </p>

      <div className="mt-6">
        <h4 className="font-bold uppercase">
          1. Choose a date
        </h4>

        <div
          role="group"
          aria-label="Pickup date"
          className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {dates.map((date) => {
            const selected =
              pickupDate === date.value;

            return (
              <button
                key={date.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  chooseDate(date.value)
                }
                className={`min-h-12 border-2 border-charcoal px-3 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-forest ${
                  selected
                    ? "bg-forest text-white"
                    : "bg-cream text-charcoal hover:bg-mustard"
                }`}
              >
                {date.label}
              </button>
            );
          })}
        </div>
      </div>

      {pickupDate && (
        <div className="mt-8">
          <h4 className="font-bold uppercase">
            2. Choose a time
          </h4>

          {slots.length === 0 ? (
            <p className="mt-3 text-sm">
              No pickup times are available for
              this date. Please choose another day.
            </p>
          ) : (
            <div
              role="group"
              aria-label="Pickup time"
              className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {slots.map((slot) => {
                const selected =
                  pickupTime === slot.value;

                return (
                  <button
                    key={slot.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      chooseTime(slot.value)
                    }
                    className={`min-h-12 border-2 border-charcoal px-3 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-forest ${
                      selected
                        ? "bg-forest text-white"
                        : "bg-cream text-charcoal hover:bg-mustard"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div
        role="status"
        aria-atomic="true"
        className="mt-8 bg-mustard p-4"
      >
        <p className="font-bold uppercase">
          Your pickup selection
        </p>

        {selectedDate && selectedSlot ? (
          <p className="mt-2">
            {selectedDate.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
              }
            )}{" "}
            at {selectedSlot.label}
          </p>
        ) : (
          <p className="mt-2 text-sm">
            Select a date and time to continue.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-forest">
        Prototype only. Pickup slots are simulated
        and do not represent confirmed availability.
      </p>
    </section>
  );
}
