import { createContext, useContext, useEffect, useState } from "react";
import { getTotalPidorStats } from "../../services/pidors.service";
import { useAuthContext } from "../AuthContext/AuthContext";

const LastPidorContext = createContext();

export const LastPidorProvider = ({ children }) => {
  const [lastPidorDay, setLastPidorDay] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    async function searchPidorDay() {
      setIsLoading(true);
      try {
        const pidorLastDay = await getTotalPidorStats("true");

        const lastDayPidor = pidorLastDay.last_pidor;

        setLastPidorDay(lastDayPidor);
      } catch (erorr) {
      } finally {
        setIsLoading(false);
      }
    }
    isAuthenticated && searchPidorDay();
  }, [isAuthenticated]);

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
