
export const PICKUP_CONFIG = {
  openDays: [0, 5, 6], // Sunday, Friday, Saturday
  startHour: 10,
  endHour: 15,
  leadTimeHours: 24,
  bookingWindowDays: 14,
};

export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getPickupDates(now = new Date()) {
  const dates = [];

  for (
    let offset = 0;
    offset <= PICKUP_CONFIG.bookingWindowDays;
    offset++
  ) {
    const date = new Date(now);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);

    if (!PICKUP_CONFIG.openDays.includes(date.getDay())) {
      continue;
    }

    if (getPickupTimes(date, now).length === 0) {
      continue;
    }

    dates.push({
      value: toDateKey(date),
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  }

  return dates;
}

export function getPickupTimes(date, now = new Date()) {
  const times = [];
  const earliest = new Date(
    now.getTime() +
    PICKUP_CONFIG.leadTimeHours * 60 * 60 * 1000
  );

  for (
    let hour = PICKUP_CONFIG.startHour;
    hour < PICKUP_CONFIG.endHour;
    hour++
  ) {
    const slot = new Date(date);
    slot.setHours(hour, 0, 0, 0);

    if (slot <= earliest) continue;

    times.push({
      value: `${String(hour).padStart(2, "0")}:00`,
      label: slot.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }

  return times;
}

export function parsePickupDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}
