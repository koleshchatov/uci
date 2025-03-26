import { useEffect, useState } from "react";
import Button from "./Button.module";
import Modal from "./Modal";
import { ImageContainer } from '../Components/Pictures/ImageContainer.jsx'
import styles from './Pictures/Picture.module.css'
import { fetchData } from "./utils";


export default function PidorModal(){

    const [ModalOpen, setModalOpen] = useState(false)
    const [pidorDay, setPidorDay] = useState({})


    useEffect (() => {
      async function getPidorDay(){
        const pidorDaySearch = await fetchData({
          path:  "/day_pidor",
          options: {
            method: "POST",
            headers: {'Content-type': "application/json"}
            }
        })

        const day = pidorDaySearch.data.pidor
      
        setPidorDay(day)


      }

      getPidorDay()


      
    }, [])
       
    function isTodaysPidorFromToday() {
      if (!pidorDay || !pidorDay.date) return false;
      const today = new Date().toISOString().split("T")[0];
      const pidorDate = pidorDay.date.split("T")[0];
      return today === pidorDate
    }

      function openModal(){
          setModalOpen(true)
      }
      function closeModal(){
        setModalOpen(false)
      }
 
      const ModalContent = (
        <div>
        <h2 >Здарова пидор!</h2>
        <img  className={styles.picture} style={{width:300, height: 400}} src = {ImageContainer[pidorDay.name]} />
        <br />
        <button onClick={closeModal}>Закрыть</button>
        </div>
      )
   
    return (
      <section>
      <Button onClick={openModal} disabled={pidorDay && isTodaysPidorFromToday()} >Узнать чемпиона!</Button>
      <Modal open = {ModalOpen}>{ModalContent}</Modal>
      </section>
      
    )
}

