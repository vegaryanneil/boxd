
const CART_STORAGE_KEY = "doh-cart";

export function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch (error) {
    console.error("Unable to load cart:", error);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (error) {
    console.error("Unable to save cart:", error);
  }
}

export function clearSavedCart() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear cart:", error);
  }
}
