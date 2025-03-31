import Picture from "/Components/Pictures/Picture.jsx";
import { ImageContainer } from "/Components/Pictures/ImageContainer.jsx";
import React from "react";
import PidorModal from "/Components/PidorModal.jsx";
import Title from "/Components/Title.jsx";
import styles from "/Components/Pictures/Picture.module.css";

export default function HomePage() {
  return (
    <>
      <Title />

      <div style={{ display: "flex" }}>
        {Object.entries(ImageContainer).map(([key, value]) => (
          <Picture
            image={value}
            key={key}
            // {...(key = { lastPidorDay }
            //   ? (className = styles.picturePidor)
            //   : (className = styles.picture))}
          />
        ))}
      </div>

      <PidorModal />
    </>
  );
}
