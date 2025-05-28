import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import StatsPage from "../../pages/StatsPage";
import OhuelPage from "../../pages/OhuelPage";
import Login from "../login";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";
import Loader from "../Loader";
import Layout from "../Layout";

export default function App() {
  const { isAuthenticated, isLoadingAuth, isAuthError, logout } =
    useAuthContext();

  if (isLoadingAuth) return <Loader />;
  if (!isAuthenticated)
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/ohuel" element={<OhuelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
// return isLoadingAuth ? (
//   <Loader />
// ) : isAuthenticated ? (
//   <>
//     <Routes>
//       <>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/stats" element={<StatsPage />} />
//       </>
//     </Routes>
//   </>
// ) : (
//   <>
//     <Routes>
//       <>
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </>
//     </Routes>
//   </>
// );
