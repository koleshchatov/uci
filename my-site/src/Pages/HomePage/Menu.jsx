import { Link } from "react-router-dom";
import styles from "../../Components/ModalPidor/Modal.module.css";
import { ImageContainer } from "../../Components/Pictures/ImageContainer.jsx";
import { usePidorContext } from "../../../useContext.jsx";

export default function Menu() {
  const { lastPidorDayContext } = usePidorContext();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Link to={"/"}>
            <img
              src={
                lastPidorDayContext.date.split("T")[0] ===
                new Date().toISOString().split("T")[0]
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
