import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Menu from "/src/Pages/HomePage/Menu.jsx";
import { LastPidorProvider } from "../useContext.jsx";
import { AuthProvider } from "../Auth/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LastPidorProvider>
        <Menu />
        <App />
      </LastPidorProvider>
    </AuthProvider>
  </BrowserRouter>
);
