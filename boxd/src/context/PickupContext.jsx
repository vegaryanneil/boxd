
import {
  createContext,
  useContext,
  useState,
} from "react";

const PickupContext = createContext(null);

export function PickupProvider({ children }) {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  function chooseDate(date) {
    setPickupDate(date);
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
    <PickupContext.Provider
      value={{
        pickupDate,
        pickupTime,
        chooseDate,
        chooseTime,
        clearPickup,
      }}
    >
      {children}
    </PickupContext.Provider>
  );
}

export function usePickup() {
  const context = useContext(PickupContext);

  if (context === null) {
    throw new Error(
      "usePickup must be used within PickupProvider"
    );
  }

  return context;
}
