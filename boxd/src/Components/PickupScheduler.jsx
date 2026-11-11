
import { useState } from "react";
import { usePickup } from "../context/PickupContext";
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

  const [now, setNow] = useState(() => new Date());

  const dates = getPickupDates(now);
  const slots = getPickupSlots(pickupDate, now);

  const selectedSlot = slots.find(
    (slot) => slot.value === pickupTime
  );

  const selectedDate = pickupDate
    ? fromDateKey(pickupDate)
    : null;

  function refreshAvailability() {
    const currentTime = new Date();

    const currentSlots = getPickupSlots(
      pickupDate,
      currentTime
    );

    if (
      pickupTime &&
      !currentSlots.some(
        (slot) => slot.value === pickupTime
      )
    ) {
      chooseTime("");
    }

    setNow(currentTime);
  }

  const buttonBase =
    "w-full min-w-0 min-h-12 border-2 border-charcoal " +
    "px-3 py-3 text-sm font-bold text-center " +
    "transition-colors break-normal " +
    "focus-visible:outline focus-visible:outline-2 " +
    "focus-visible:outline-offset-2";

  return (
    <section
      id="pickup-scheduler"
      aria-labelledby="pickup-heading"
      className="mt-8 w-full min-w-0 max-w-full border-t-2 border-charcoal pt-8"
    >
      {/* HEADER */}
      <div className="flex w-full min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full min-w-0 flex-1">
          <h3
            id="pickup-heading"
            className="font-display text-xl leading-tight sm:text-2xl md:text-3xl"
          >
            SCHEDULE YOUR PICKUP
          </h3>

          <p className="mt-3 text-sm leading-relaxed">
            Select a date and time for your BOXD
            order. Please allow at least 60 minutes
            for preparation.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshAvailability}
          className="min-h-11 w-full shrink-0 border-2 border-charcoal px-4 py-2 text-sm font-bold hover:bg-mustard sm:w-auto"
        >
          Refresh Times
        </button>
      </div>

      {/* DATE SELECTION */}
      <div className="mt-8 w-full min-w-0">
        <h4 className="font-bold uppercase">
          1. Select a date
        </h4>

        {dates.length === 0 ? (
          <p className="mt-3 text-sm">
            No pickup dates are available.
          </p>
        ) : (
          <div
            role="group"
            aria-label="Pickup dates"
            className="mt-4 grid w-full min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
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
                  className={`${buttonBase} ${
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
        )}
      </div>

      {/* TIME SELECTION */}
      {pickupDate && (
        <div className="mt-8 w-full min-w-0">
          <h4 className="font-bold uppercase">
            2. Select a pickup time
          </h4>

          {slots.length === 0 ? (
            <div
              role="status"
              className="mt-4 border-2 border-charcoal bg-white p-4 text-sm"
            >
              No pickup times are available for
              this date. Please select another date.
            </div>
          ) : (
            <div
              role="group"
              aria-label="Pickup times"
              className="mt-4 grid w-full min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
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
                    className={`${buttonBase} ${
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

      {/* PICKUP SUMMARY */}
      <div
        role="status"
        aria-atomic="true"
        className="mt-8 w-full min-w-0 bg-mustard p-4 text-charcoal"
      >
        <p className="font-bold uppercase">
          Your pickup selection
        </p>

        {selectedDate && selectedSlot ? (
          <p className="mt-2 break-words font-medium">
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
        ) : pickupDate ? (
          <p className="mt-2 text-sm">
            Date selected. Please choose a pickup time.
          </p>
        ) : (
          <p className="mt-2 text-sm">
            Choose a date and time to continue.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-forest">
        Prototype only. Pickup availability is
        simulated and not a confirmed reservation.
      </p>
    </section>
  );
}
