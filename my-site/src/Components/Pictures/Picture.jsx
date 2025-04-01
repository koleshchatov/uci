import styles from "./Picture.module.css";
import React from "react";

export default function Picture({ image, className }) {
  return (
    <div className={styles.block}>
      <img src={image} className={className} alt="Здесь фотка пидора" />
    </div>
  );
}
