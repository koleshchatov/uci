import { useEffect, useState } from "react";
import Button from "./Button.module";
import Modal from "./Modal";
import { ImageContainer } from "../Components/Pictures/ImageContainer.jsx";
import styles from "./Pictures/Picture.module.css";
import { fetchData } from "./utils";
import isTodaysPidorFromToday from "../src/Pages/HomePage.jsx";

export default function PidorModal({ lastPidorDay, setLastPidorDay }) {
  const [ModalOpen, setModalOpen] = useState(false);

  async function getPidorDay() {
    const pidorDaySearch = await fetchData({
      path: "/day_pidor",
      options: {
        method: "POST",
        headers: { "Content-type": "application/json" },
      },
    });
    const day = pidorDaySearch.data.pidor;
    setLastPidorDay(day);
  }

  function openModal() {
    if (lastPidorDay.date !== new Date().toISOString().split("T")[0]) {
      setModalOpen(true);
      getPidorDay();
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  const ModalContent = (
    <div>
      <h2>Здарова пидор!</h2>
      <img
        className={styles.picture}
        style={{ width: 300, height: 400, backgrond: "gold" }}
        src={ImageContainer[lastPidorDay.name]}
      />
      <br />
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );

  return (
    <section>
      <Button onClick={openModal} disabled={isTodaysPidorFromToday()}>
        Узнать чемпиона!
      </Button>
      <Modal open={ModalOpen}>{ModalContent}</Modal>
    </section>
  );
}
