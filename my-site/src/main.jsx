import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/Routes/index.jsx";
import { BrowserRouter } from "react-router-dom";
import { LastPidorProvider } from "./contexts/LastPidorContext/lastPidorContext.jsx";
import { AuthProvider } from "./contexts/AuthContext/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LastPidorProvider>
        <App />
      </LastPidorProvider>
    </AuthProvider>
  </BrowserRouter>
);
