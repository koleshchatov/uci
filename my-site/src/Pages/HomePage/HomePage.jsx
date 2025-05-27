import Picture from "../../Components/Pictures/Picture.jsx";
import { ImageContainer } from "../../Components/Pictures/ImageContainer.jsx";
import PidorModal from "../../Components/ModalPidor/PidorModal.jsx";
import Title from "./Title.jsx";
import styles from "./HomePage.module.css";
import { usePidorContext } from "../../Components/contexts/LastPidorContext/lastPidorContext.jsx";
import Loader from "../../Components/Loader/loader.jsx";

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
