
import { useEffect, useState } from "react";
import { loadCart, saveCart } from "./utils/cartStorage";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Method from "./components/Method";
import Products from "./components/Products";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import PickupScheduler from "./components/PickupScheduler";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [pickupSelection, setPickupSelection] = useState(() => {
    try {
      const saved = localStorage.getItem("doh-pickup");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });


useEffect(() => {
  try {
    if (pickupSelection) {
      localStorage.setItem(
        "doh-pickup",
        JSON.stringify(pickupSelection)
      );
    } else {
      localStorage.removeItem("doh-pickup");
    }
  } catch (error) {
    console.error("Unable to save pickup:", error);
  }
}, [pickupSelection]);



useEffect(() => {
  saveCart(cart);
}, [cart]);


  function addToCart(product, quantity) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentCart, { ...product, quantity }];
    });
  }

 
function updateQuantity(productId, quantity) {
  if (!Number.isInteger(quantity)) {
    return;
  }

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === productId
        ? { ...item, quantity }
        : item
    )
  );
}

function clearCart() {
  setCart([]);
}


function handlePlaceOrder(orderDetails) {
  // This is a simulated order, not a real transaction.
  const orderId = `DOH-TEST-${Date.now()}`;

  setCompletedOrder({
    ...orderDetails,
    id: orderId,
  });

  // Clear the shopping cart after creating the test order.
  setCart([]);
  setPickupSelection(null);
  setCheckoutOpen(false);
}

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar
          cartCount={cartCount}
  onOpenCart={() => {
    console.log("App: Opening cart");
    setCartOpen(true);
  }}
      />

      <main>
        <Hero />
        <Marquee />
        <Method />
        <Products onSelectProduct={setSelectedProduct} />
        <section
          id="faq"
          className="scroll-mt-24 border-t-2 border-ink bg-cream px-5 py-24 md:px-10"
        >
          <div className="mx-auto max-w-[1600px]">
            <h2 className="font-display text-5xl md:text-7xl">
              FAQ.
            </h2>
            <p className="mt-5 font-bold">
              Frequently asked questions coming soon.
            </p>
          </div>
        </section>
      </main>

      
{/* Product Quick View Modal */}
{selectedProduct && (
  <ProductModal
    key={selectedProduct.id}
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
    onAddToCart={addToCart}
  />
)}

{/* Shopping Cart Drawer */}

{cartOpen && (
  <CartDrawer
    cart={cart}
    pickupSelection={pickupSelection}
    onClose={() => setCartOpen(false)}
    onUpdateQuantity={updateQuantity}
    onRemove={removeFromCart}
    onCheckout={() => {
      if (cart.length === 0) return;

      setCartOpen(false);
      setPickupOpen(true);
    }}
  />
)}


{pickupOpen && (
  <div className="fixed inset-0 z-[9999] overflow-y-auto bg-ink/80 p-4 sm:p-8">
    <PickupScheduler
      onBack={() => {
        setPickupOpen(false);
        setCartOpen(true);
      }}
      
      onConfirm={(selection) => {
        setPickupSelection(selection);
        setPickupOpen(false);
        setCartOpen(false);
        setCheckoutOpen(true);
      }}

    />
  </div>
)}

{/* Checkout */}
{checkoutOpen && (
  <div className="fixed inset-0 z-[9999] overflow-y-auto bg-ink/80 p-4 sm:p-8">
    <Checkout
      cart={cart}
      pickupSelection={pickupSelection}
      onBack={() => {
        setCheckoutOpen(false);
        setCartOpen(true);
      }}
      onPlaceOrder={handlePlaceOrder}
    />
  </div>
)}

{/* Order confirmation */}
{completedOrder && (
  <div className="fixed inset-0 z-[9999] overflow-y-auto bg-ink/80 p-4 sm:p-8">
    <OrderConfirmation
      order={completedOrder}
      onDone={() => setCompletedOrder(null)}
    />
  </div>
)}

    </>
  );
}
