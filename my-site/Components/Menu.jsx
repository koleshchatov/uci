import { Link } from "react-router-dom";
import styles from "./Modal.module.css";

export default function Menu() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Link to={"/"}>
            <img
              src="public/лого.png"
              alt="logo"
              className={styles.imageLogo}
            />
          </Link>
        </div>
        <div className={styles.headerLinks}>
          <div className={styles.headerStats}>
            <Link to={"/stats"}>Посмотрим статистику</Link>
          </div>
        </div>
      </div>
    </>
  );
}
