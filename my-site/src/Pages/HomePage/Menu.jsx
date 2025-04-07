import { Link } from "react-router-dom";
import styles from "../../Components/ModalPidor/Modal.module.css";
import { ImageContainer } from "../../Components/Pictures/ImageContainer.jsx";
import { usePidorContext } from "../../../useContext.jsx";

const { lastPidor } = usePidorContext;

console.log(lastPidor);

export default function Menu() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Link to={"/"}>
            <img
              src={
                lastPidor === new Date().toISOString().split("T")[0]
                  ? ImageContainer[lastPidor.name]
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
