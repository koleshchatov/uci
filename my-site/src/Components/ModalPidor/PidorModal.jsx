import { useEffect, useState } from "react";
import Button from "../Buttons/Button.jsx";
import Modal from "./Modal";
import { ImageContainer } from "../Pictures/ImageContainer.jsx";
import styles from "../Pictures/Picture.module.css";
import { setPidorDay } from "../pidors.service.js";
import Loader from "../Loader/loader.jsx";

export default function PidorModal({ lastPidorDay, setLastPidorDay }) {
  const [ModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  async function handlePidorDay() {
    const pidorDaySearch = await setPidorDay();
    setIsLoading(true)
    const pidor = pidorDaySearch.pidor;
    setIsLoading(false)
    setLastPidorDay(pidor);
  }

  function isTodaysPidorFromToday() {
    if (!lastPidorDay || !lastPidorDay.date) return false;
    const today = new Date().toISOString().split("T")[0];
    const pidorDate = lastPidorDay.date.split("T")[0];
    return today === pidorDate;
  }

  function openModal() {
    if (lastPidorDay.date !== new Date().toISOString().split("T")[0]) {
      setModalOpen(true);
      handlePidorDay();
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
      <Button
        className={styles.button}
        onClick={openModal}
        disabled={isTodaysPidorFromToday()}
      >
        Узнать чемпиона!
      </Button>
      {isLoading? <Loader/> : <Modal open={ModalOpen}>{ModalContent}</Modal>}
    </section>
  );
}
