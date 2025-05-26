import { createContext, useState, useContext, useEffect } from "react";
import {
  getAuthentication,
  loginUser,
  logoutUser,
} from "../src/Components/pidors.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const [isError, setIsError] = useState();

  useEffect(() => {
    async function authentication() {
      setIsLoadingAuth(true);
      try {
        const auth = await getAuthentication();
        if (auth.status === 401) {
          await logout();
        }
        setIsAuthenticated(auth.data.authorized);
      } catch (error) {
      } finally {
        setIsLoadingAuth(false);
      }
    }

    authentication();
  }, []);

  async function login({ name, password }) {
    setIsLoadingAuth(true);
    const getLogin = await loginUser({ name, password });

    {
      getLogin.success ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }
    setIsError(getLogin.error);
    setIsLoadingAuth(false);
  }

  async function logout() {
    setIsLoadingAuth(true);
    const getLogout = await logoutUser();

    {
      getLogout.success ? setIsAuthenticated(false) : setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoadingAuth,
        isAuthenticated,
        login,
        logout,
        isError,
      }}
    >
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
