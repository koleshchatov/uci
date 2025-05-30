import { Link } from "react-router-dom";
import styles from "../../../components/ModalPidor/Modal.module.css";
import { ImageContainer } from "../../../components/Pictures/ImageContainer.js";
import { usePidorContext } from "../../../contexts/LastPidorContext/lastPidorContext.jsx";
import Loader from "../../../components/Loader/index.jsx";
import { useAuthContext } from "../../../contexts/AuthContext/AuthContext.jsx";

export default function Menu() {
  const { isLoading, lastPidorDay } = usePidorContext();
  const { logout } = useAuthContext();

  function isTodaysPidorFromToday() {
    if (!lastPidorDay || !lastPidorDay.date) return false;
    const today = new Date().toISOString().split("T")[0];
    const pidorDate = lastPidorDay.date.split("T")[0];
    return today === pidorDate;
  }

  const handleExit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          {isLoading ? (
            <Loader />
          ) : (
            <Link to={"/"}>
              <img
                src={
                  isTodaysPidorFromToday()
                    ? ImageContainer[lastPidorDay.name]
                    : "public/лого.jpg"
                }
                alt="logo"
                className={styles.imageLogo}
              />
            </Link>
          )}
        </div>
        <div className={styles.headerStats}>
          <Link to={"/stats"}>Статистика</Link>
        </div>
        <div className={styles.headerStats}>
          <Link to={"/ohuel"}>ТОП ОХУЕВШИХ</Link>
        </div>
        <div className={styles.headerLogin}>
          <Link onClick={handleExit}>Выйти</Link>
        </div>
      </div>
    </>
  );
}
