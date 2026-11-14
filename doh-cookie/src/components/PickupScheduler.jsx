
import { useMemo, useState } from "react";
import { ArrowLeft, CalendarCheck } from "lucide-react";

import PickupDateSelector from "./PickupDateSelector";
import {
  getPickupDates,
  getPickupTimes,
  parsePickupDate,
} from "../utils/pickupSlots";

export default function PickupScheduler({
  onBack,
  onConfirm,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dates = useMemo(() => getPickupDates(), []);

  const times = useMemo(() => {
    if (!selectedDate) return [];

    return getPickupTimes(
      parsePickupDate(selectedDate)
    );
  }, [selectedDate]);

  function handleSelectDate(date) {
    setSelectedDate(date);
    setSelectedTime("");
  }

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;

    onConfirm({
      date: selectedDate,
      time: selectedTime,
    });
  }

  return (
    <div className="mx-auto max-w-4xl border-2 border-ink bg-cream">
      {/* Header */}
      <div className="border-b-2 border-ink bg-butter p-6 sm:p-10">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 font-extrabold"
        >
          <ArrowLeft size={20} />
          BACK TO CART
        </button>

        <p className="mb-3 text-xs font-extrabold tracking-widest">
          DOH. / PICKUP
        </p>

        <h2 className="font-display text-4xl leading-tight sm:text-6xl">
          WHEN'S COOKIE TIME?
        </h2>

        <p className="mt-4 font-bold">
          Choose when you'd like to pick up your order.
        </p>
      </div>

      <div className="space-y-10 p-6 sm:p-10">
        {/* Dates */}
        <PickupDateSelector
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />

        {/* Times */}
        {selectedDate && (
          <div>
            <h3 className="mb-4 font-extrabold uppercase">
              Choose your time
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {times.map((time) => (
                <button
                  key={time.value}
                  type="button"
                  onClick={() => setSelectedTime(time.value)}
                  aria-pressed={selectedTime === time.value}
                  className={`
                    min-h-14 border-2 border-ink
                    px-4 py-3 font-extrabold
                    transition
                    ${
                      selectedTime === time.value
                        ? "bg-butter"
                        : "bg-cream hover:bg-butter/40"
                    }
                  `}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation */}
        {selectedDate && selectedTime && (
          <div className="border-2 border-ink bg-butter p-6">
            <div className="flex items-center gap-3">
              <CalendarCheck size={28} />

              <div>
                <p className="text-xs font-extrabold uppercase">
                  Your pickup selection
                </p>

                <p className="font-display text-lg">
                  {selectedDate} at {selectedTime}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="
            min-h-14 w-full border-2 border-ink
            bg-ink px-6 py-4 font-extrabold
            text-cream transition hover:bg-butter
            hover:text-ink disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          CONFIRM PICKUP TIME
        </button>
      </div>
    </div>
  );
}
