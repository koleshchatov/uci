import "./App.css";
import { Navigate, replace, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import StatsPage from "./Pages/StatsPage/StatsPage";
import Login from "../Auth/Login";
import { useAuthContext } from "../Auth/AuthContext";
import Loader from "./Components/Loader/loader";

export default function App() {
  const { isAuthenticated, isLoadingAuth } = useAuthContext();

  if (isLoadingAuth === true) {
    <Loader />;
  }
  if (isAuthenticated === true)
    return (
      <>
        <Routes>
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </>
        </Routes>
      </>
    );
  else isAuthenticated === false;
  return (
    <>
      <Routes>
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      </Routes>
    </>
  );

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
}
