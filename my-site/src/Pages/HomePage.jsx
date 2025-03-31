import Picture from "/Components/Pictures/Picture.jsx";
import { ImageContainer } from "/Components/Pictures/ImageContainer.jsx";
import React from "react";
import PidorModal from "/Components/PidorModal.jsx";
import Title from "/Components/Title.jsx";
import styles from "/Components/Pictures/Picture.module.css";
import { fetchData } from "/Components/utils";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [lastPidorDay, setLastPidorDay] = useState({});

  useEffect(() => {
    async function searchLastPidorDay() {
      const pidorDaySearch = await fetchData({
        path: "/pidor_stats",
        urlParamsObject: { full: "true" },
        options: {},
      });

      const lastPidor = pidorDaySearch.data.last_pidor;
      setLastPidorDay(lastPidor);
    }

    searchLastPidorDay();
  }, []);

  return (
    <>
      <Title />

      <div style={{ display: "flex" }}>
        {Object.entries(ImageContainer).map(([key, value]) => (
          <Picture
            image={value}
            key={key}
            className={
              key === lastPidorDay.name ? styles.picturePidor : styles.picture
            }
          />
        ))}
      </div>

      <PidorModal
        lastPidorDay={lastPidorDay}
        setLastPidorDay={setLastPidorDay}
      />
    </>
  );
}
