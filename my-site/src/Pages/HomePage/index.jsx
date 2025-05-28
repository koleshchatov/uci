import Picture from "../../components/Pictures/";
import { ImageContainer } from "../../components/Pictures/ImageContainer.js";
import PidorModal from "../../components/ModalPidor/index.jsx";
import Title from "./Title/index.jsx";
import styles from "./HomePage.module.css";
import { usePidorContext } from "../../contexts/LastPidorContext/lastPidorContext.jsx";
import Loader from "../../components/Loader";

export default function HomePage() {
  const { isLoading, lastPidorDay, setLastPidorDay } = usePidorContext();
  return (
    <>
      <Title />

      <div className={styles.homePage}>
        {isLoading ? (
          <Loader />
        ) : (
          Object.entries(ImageContainer).map(([key, value]) => (
            <Picture
              image={value}
              key={key}
              className={
                lastPidorDay && key === lastPidorDay.name
                  ? styles.picturePidor
                  : styles.picture
              }
            />
          ))
        )}
      </div>

      <PidorModal
        lastPidorDay={lastPidorDay}
        setLastPidorDay={setLastPidorDay}
      />
    </>
  );
}
