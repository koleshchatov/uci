import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "./src/Components/Utils/utils";

const LastPidorContext = createContext();

export const LastPidorProvider = ({ children }) => {
  const [lastPidor, setLastPidor] = useState({});

  useEffect(() => {
    async function searchPidorDay() {
      const pidorLastDay = await fetchData({
        path: "/pidor_stats",
        urlParamsObject: { full: "true" },
        options: {},
      });

      const lastDayPidor = pidorLastDay.data.last_pidor;

      setLastPidor(lastDayPidor);
    }

    searchPidorDay();
  }, []);

  const contextValue = {
    lastPidor,
    setLastPidor,
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
