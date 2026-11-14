
import { describe, expect, it } from "vitest";

import {
  getPickupDates,
  getPickupTimes,
  parsePickupDate,
  toDateKey,
} from "./pickupSlots";

describe("pickupSlots", () => {
  it("formats dates as YYYY-MM-DD", () => {
    const date = new Date(2026, 10, 21);

    expect(toDateKey(date)).toBe("2026-11-21");
  });

  it("parses a local calendar date", () => {
    const date = parsePickupDate("2026-11-21");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(10);
    expect(date.getDate()).toBe(21);
  });

  it("only returns configured pickup days", () => {
    const now = new Date(2026, 10, 16, 9, 0);

    const dates = getPickupDates(now);

    expect(dates.length).toBeGreaterThan(0);

    for (const item of dates) {
      const day = parsePickupDate(item.value).getDay();

      expect([0, 5, 6]).toContain(day);
    }
  });

  it("excludes times inside the lead-time window", () => {
    const now = new Date(2026, 10, 20, 12, 0);
    const pickupDate = new Date(2026, 10, 21);

    const times = getPickupTimes(pickupDate, now);

    expect(times.map((slot) => slot.value)).toEqual([
      "13:00",
      "14:00",
    ]);
  });

  it("returns no times after the day's pickup window", () => {
    const now = new Date(2026, 10, 21, 16, 0);
    const pickupDate = new Date(2026, 10, 21);

    expect(getPickupTimes(pickupDate, now)).toEqual([]);
  });
});
