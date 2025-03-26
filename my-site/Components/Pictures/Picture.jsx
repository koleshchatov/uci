import styles from "./Picture.module.css";
import React from "react";

export default function Picture({ image, isChampion }) {
  return (
    <div className={styles.pictureContainer}>
      {isChampion && (
        <div className={styles.crown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="gold"
          >
            <path d="M12 1L15.5 8L23 9.5L17 14.5L18.5 22L12 18.5L5.5 22L7 14.5L1 9.5L8.5 8L12 1Z" />
          </svg>
        </div>
      )}
      <img
        src={image}
        className={`${styles.picture} ${
          isChampion ? styles.championPicture : ""
        }`}
        alt="Здесь фотка пидора"
      />
    </div>
  );
}
