import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Menu from "/src/Pages/HomePage/Menu.jsx";
import { LastPidorProvider } from "../useContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LastPidorProvider>
      <Menu />
      <App />
    </LastPidorProvider>
  </BrowserRouter>
);
