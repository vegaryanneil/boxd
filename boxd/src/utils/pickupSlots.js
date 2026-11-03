
export const PICKUP_SETTINGS = {
  leadTimeMinutes: 60,
  intervalMinutes: 30,
  daysAhead: 5,
};

// Sunday = 0, Saturday = 6
const HOURS = {
  0: null,
  1: { open: 11, close: 20 },
  2: { open: 11, close: 20 },
  3: { open: 11, close: 20 },
  4: { open: 11, close: 20 },
  5: { open: 11, close: 20 },
  6: { open: 11, close: 21 },
};

export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function fromDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function getPickupDates(now = new Date()) {
  return Array.from(
    { length: PICKUP_SETTINGS.daysAhead },
    (_, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + index
      );

      return {
        value: toDateKey(date),
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      };
    }
  ).filter(({ value }) => {
    const date = fromDateKey(value);
    return HOURS[date.getDay()] !== null;
  });
}

export function getPickupSlots(dateKey, now = new Date()) {
  if (!dateKey) return [];

  const date = fromDateKey(dateKey);

  if (Number.isNaN(date.getTime())) {
    return [];
  }

  const hours = HOURS[date.getDay()];

  if (!hours) return [];

  const earliest = new Date(
    now.getTime() +
      PICKUP_SETTINGS.leadTimeMinutes * 60000
  );

  const slots = [];

  for (
    let minutes = hours.open * 60;
    minutes < hours.close * 60;
    minutes += PICKUP_SETTINGS.intervalMinutes
  ) {
    const slotDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      Math.floor(minutes / 60),
      minutes % 60
    );

    if (slotDate < earliest) continue;

    slots.push({
      value: `${dateKey}T${String(
        slotDate.getHours()
      ).padStart(2, "0")}:${String(
        slotDate.getMinutes()
      ).padStart(2, "0")}`,
      label: slotDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }

  return slots;
}
