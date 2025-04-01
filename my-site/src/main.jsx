import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Menu from "/src/Pages/HomePage/Menu.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Menu />
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
