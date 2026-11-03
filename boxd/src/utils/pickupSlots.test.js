
import test from "node:test";
import assert from "node:assert/strict";

import {
  getPickupDates,
  getPickupSlots,
  toDateKey,
} from "./pickupSlots.js";

test("creates five calendar dates excluding Sunday", () => {
  // Monday, November 2, 2026
  const now = new Date(2026, 10, 2, 9, 0);

  const dates = getPickupDates(now);

  assert.equal(dates.length, 5);
  assert.equal(dates[0].value, "2026-11-02");
});

test("does not offer pickup on Sunday", () => {
  const now = new Date(2026, 10, 7, 10, 0);

  const slots = getPickupSlots(
    "2026-11-08",
    now
  );

  assert.deepEqual(slots, []);
});

test("respects the 60-minute preparation time", () => {
  const now = new Date(2026, 10, 2, 11, 45);

  const slots = getPickupSlots(
    "2026-11-02",
    now
  );

  assert.equal(slots[0].label, "1:00 PM");
});

test("does not show past pickup slots", () => {
  const now = new Date(2026, 10, 2, 19, 30);

  const slots = getPickupSlots(
    "2026-11-02",
    now
  );

  assert.equal(slots.length, 0);
});

test("formats local calendar dates", () => {
  const date = new Date(2026, 10, 3);

  assert.equal(
    toDateKey(date),
    "2026-11-03"
  );
});
