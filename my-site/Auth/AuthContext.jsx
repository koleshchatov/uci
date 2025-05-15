import { createContext, useState, useContext, useEffect } from "react";
import { getAuthentication, loginUser } from "../src/Components/pidors.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function authentication() {
      const auth = await getAuthentication();
      setIsAuthenticated(auth.authorized);
    }

    authentication();
  }, []);

  async function login({ name, password }) {
    const getLogin = await loginUser({ name, password });
    {
      getLogin.success ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
