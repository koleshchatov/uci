import { createContext, useContext, useEffect, useState } from "react";
import { getTotalPidorStats } from "./src/Components/pidors.service";

const LastPidorContext = createContext();

export const LastPidorProvider = ({ children }) => {
  const [lastPidorDay, setLastPidorDay] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function searchPidorDay() {
      setIsLoading(true);
      const pidorLastDay = await getTotalPidorStats("true");

      const lastDayPidor = pidorLastDay.last_pidor;
      setIsLoading(false);
      setLastPidorDay(lastDayPidor);
    }

    searchPidorDay();
  }, []);

  const contextValue = {
    isLoading,
    lastPidorDay,
    setLastPidorDay,
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
