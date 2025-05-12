import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import StatsPage from "./Pages/StatsPage/StatsPage";
import Login from "../Auth/AuthProvider";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}
