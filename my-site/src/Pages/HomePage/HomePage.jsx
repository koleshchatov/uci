import Picture from "../../Components/Pictures/Picture.jsx";
import { ImageContainer } from "../../Components/Pictures/ImageContainer.jsx";
import React from "react";
import PidorModal from "../../Components/ModalPidor/PidorModal.jsx";
import Title from "./Title.jsx";
import styles from "./HomePage.module.css";
import { usePidorContext } from "../../../useContext.jsx";
import Loader from "../../Components/Loader/loader.jsx";



export default function HomePage() {
  const { isLoading, lastPidorDayContext, setLastPidorDayContext } = usePidorContext();
  return (
    <>
      <Title />

      <div className={styles.homePage}>
      {isLoading? <Loader/> : Object.entries(ImageContainer).map(([key, value]) => (
        <Picture
          image={value}
          key={key}
          className={
            key === lastPidorDayContext.name
              ? styles.picturePidor
              : styles.picture
            }
          />
        ))}
      </div>

      <PidorModal
        lastPidorDay={lastPidorDayContext}
        setLastPidorDay={setLastPidorDayContext}
      />
    </>
  );
}
