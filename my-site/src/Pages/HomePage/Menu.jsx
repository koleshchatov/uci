import { Link } from "react-router-dom";
import styles from "../../Components/ModalPidor/Modal.module.css";
import { ImageContainer } from "../../Components/Pictures/ImageContainer.jsx";
import { usePidorContext } from "../../../useContext.jsx";

export default function Menu() {
  const { lastPidorDayContext } = usePidorContext();

  function isTodaysPidorFromToday() {
    if (!lastPidorDayContext || !lastPidorDayContext.date) return false;
    const today = new Date().toISOString().split("T")[0];
    const pidorDate = lastPidorDayContext.date.split("T")[0];
    return today === pidorDate;
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
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
        </div>
        <div className={styles.headerStats}>
          <Link to={"/stats"}>Посмотрим статистику</Link>
        </div>
      </div>
    </>
  );
}
