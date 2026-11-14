
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PickupDateSelector from "./PickupDateSelector";

describe("PickupDateSelector", () => {
  const dates = [
    {
      value: "2026-11-20",
      label: "Fri, Nov 20",
    },
    {
      value: "2026-11-21",
      label: "Sat, Nov 21",
    },
  ];

  it("renders available dates", () => {
    render(
      <PickupDateSelector
        dates={dates}
        selectedDate=""
        onSelectDate={() => {}}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "Fri, Nov 20",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Sat, Nov 21",
      })
    ).toBeInTheDocument();
  });

  it("calls the selection handler when clicked", async () => {
    const user = userEvent.setup();
    const onSelectDate = vi.fn();

    render(
      <PickupDateSelector
        dates={dates}
        selectedDate=""
        onSelectDate={onSelectDate}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "Sat, Nov 21",
      })
    );

    expect(onSelectDate).toHaveBeenCalledWith(
      "2026-11-21"
    );
  });

  it("identifies the selected date", () => {
    render(
      <PickupDateSelector
        dates={dates}
        selectedDate="2026-11-21"
        onSelectDate={() => {}}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "Sat, Nov 21",
      })
    ).toHaveAttribute("aria-pressed", "true");
  });
});
