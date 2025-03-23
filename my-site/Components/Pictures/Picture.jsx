import styles from "./Picture.module.css";
import React from "react";

export default function Picture({ image }) {
  return (
    // Можно убрать обертку .block, так как сетка теперь управляется через photoGrid
    <img src={image} className={styles.picture} alt="Здесь фотка пидора" />
  );
}
