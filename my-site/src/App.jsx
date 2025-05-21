import "./App.css";
import { Navigate, replace, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import StatsPage from "./Pages/StatsPage/StatsPage";
import Login from "../Auth/Login";
import { useAuthContext } from "../Auth/AuthContext";
import Loader from "./Components/Loader/loader";
import Layout from "./layout";

export default function App() {
  const { isAuthenticated, isLoadingAuth } = useAuthContext();

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
