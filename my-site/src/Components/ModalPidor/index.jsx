import { useState } from "react";
import Button from "../Buttons/index.jsx";
import Modal from "./Modal.jsx";
import { ImageContainer } from "../Pictures/ImageContainer.js";
import styles from "../Pictures/Picture.module.css";
import { setPidorDay } from "../Services/pidors.service.js";
import Loader from "../Loader/index.jsx";
import { useAuthContext } from "../contexts/AuthContext/AuthContext.jsx";

export default function PidorModal({ lastPidorDay, setLastPidorDay }) {
  const [ModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoadingAuth } = useAuthContext();

  async function handlePidorDay() {
    const pidorDaySearch = await setPidorDay();
    setIsLoading(true);
    const pidor = pidorDaySearch.pidor;

    setLastPidorDay(pidor);
    setIsLoading(false);
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
        src={lastPidorDay && ImageContainer[lastPidorDay.name]}
      />
      <br />
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );

  return (
    <>
      {isLoadingAuth ? (
        <Loader />
      ) : (
        <section>
          <Button
            className={styles.button}
            onClick={openModal}
            disabled={isTodaysPidorFromToday()}
          >
            Узнать чемпиона!
          </Button>
          {isLoading ? (
            <Loader />
          ) : (
            <Modal open={ModalOpen}>{ModalContent}</Modal>
          )}
        </section>
      )}
    </>
  );
}
