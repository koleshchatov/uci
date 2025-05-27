import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Components/Routes/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LastPidorProvider } from "./Components/contexts/LastPidorContext/lastPidorContext.jsx";
import { AuthProvider } from "./Components/contexts/AuthContext/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LastPidorProvider>
        <App />
      </LastPidorProvider>
    </AuthProvider>
  </BrowserRouter>
);
