import { Link } from "react-router-dom";
import styles from "../../Components/ModalPidor/Modal.module.css";
import { ImageContainer } from "../../Components/Pictures/ImageContainer.jsx";
import { usePidorContext } from "../../../useContext.jsx";
import Loader from "../../Components/Loader/loader.jsx";
import { useAuthContext } from "../../../Auth/AuthContext.jsx";

export default function Menu() {
  const { isLoading, lastPidorDayContext } = usePidorContext();
  const { isAuthenticated, logout, isLoadingAuth } = useAuthContext();

  function isTodaysPidorFromToday() {
    if (!lastPidorDayContext || !lastPidorDayContext.date) return false;
    const today = new Date().toISOString().split("T")[0];
    const pidorDate = lastPidorDayContext.date.split("T")[0];
    return today === pidorDate;
  }

  const handleExit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            {isLoading ? (
              <Loader />
            ) : (
              <Link to={"/"}>
                <img
                  src={
                    isTodaysPidorFromToday()
                      ? ImageContainer[lastPidorDayContext.name]
                      : "public/лого.jpg"
                  }
                  alt="logo"
                  className={styles.imageLogo}
                />
              </Link>
            )}
          </div>
          <div className={styles.headerStats}>
            <Link to={"/stats"}>Посмотрим статистику</Link>
          </div>
          <div className={styles.headerLogin}>
            <Link onClick={handleExit}>Выйти</Link>
          </div>
        </div>
      ) : (
        <div>
          <div></div>
        </div>
      )}
    </>
  );
}
