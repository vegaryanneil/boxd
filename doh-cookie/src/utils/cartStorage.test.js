
import { beforeEach, describe, expect, it } from "vitest";

import {
  loadCart,
  saveCart,
  clearSavedCart,
} from "./cartStorage";

describe("cartStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty cart when nothing is saved", () => {
    expect(loadCart()).toEqual([]);
  });

  it("saves and restores cart items", () => {
    const cart = [
      {
        id: "cookie",
        name: "Signature Chocolate Chip Cookie",
        price: 4,
        quantity: 2,
      },
    ];

    saveCart(cart);

    expect(loadCart()).toEqual(cart);
  });

  it("removes saved cart data", () => {
    saveCart([
      {
        id: "cookie",
        quantity: 1,
      },
    ]);

    clearSavedCart();

    expect(loadCart()).toEqual([]);
  });

  it("handles invalid saved JSON", () => {
    localStorage.setItem("doh-cart", "not-valid-json");

    expect(loadCart()).toEqual([]);
  });

  it("rejects invalid cart structures", () => {
    localStorage.setItem(
      "doh-cart",
      JSON.stringify({ quantity: 2 })
    );

    expect(loadCart()).toEqual([]);
  });
});
