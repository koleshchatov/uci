import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import StatsPage from "./Pages/StatsPage/StatsPage";
import Login from "../Auth/AuthProvider";
import { useAuthContext } from "../Auth/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/login" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/stats" element={<Login />} />
        </>
      )}
    </Routes>
  );
}
