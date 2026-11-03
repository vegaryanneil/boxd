
import {
  createContext,
  useContext,
  useState,
} from "react";

const PickUpContext = createContext(null);

export function PickupProvider({ children }) {
  const [pickupDate, setPickupDate] =
    useState("");

  const [pickupTime, setPickupTime] =
    useState("");

  function chooseDate(date) {
    setPickupDate(date);

    // Reset time when customer changes date.
    setPickupTime("");
  }

  function chooseTime(time) {
    setPickupTime(time);
  }

  function clearPickup() {
    setPickupDate("");
    setPickupTime("");
  }

  return (
    <PickUpContext.Provider
      value={{
        pickupDate,
        pickupTime,
        chooseDate,
        chooseTime,
        clearPickup,
      }}
    >
      {children}
    </PickUpContext.Provider>
  );
}

export function usePickup() {
  const context = useContext(PickUpContext);

  if (!context) {
    throw new Error(
      "usePickup must be used inside PickupProvider"
    );
  }

  return context;
}
