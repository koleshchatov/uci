import { createContext, useContext, useEffect, useState } from "react";
import { getTotalPidorStats } from "./src/Components/pidors.service";

const LastPidorContext = createContext();

export const LastPidorProvider = ({ children }) => {
  const [lastPidorDayContext, setLastPidorDayContext] = useState({});

  useEffect(() => {
    async function searchPidorDay() {
      const pidorLastDay = await getTotalPidorStats("true");

      const lastDayPidor = pidorLastDay.last_pidor;

      setLastPidorDayContext(lastDayPidor);
    }

    searchPidorDay();
  }, []);

  const contextValue = {
    lastPidorDayContext,
    setLastPidorDayContext,
  };

  return (
    <LastPidorContext.Provider value={contextValue}>
      {children}
    </LastPidorContext.Provider>
  );
};

export const usePidorContext = () => {
  const context = useContext(LastPidorContext);

  if (!context) {
    throw new Error("usePidorContext must be used within an LastPidorProvider");
  }

  return context;
};
