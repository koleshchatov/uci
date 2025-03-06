import { useState } from "react";
import Button from "./Button.module";
import Modal from "./Modal";
import { ImageContainer } from '../Components/Pictures/ImageContainer.jsx'
import styles from './Pictures/Picture.module.css'


export default function PidorModal(){

    const [ModalOpen, setModalOpen] = useState(false)
       
      function openModal(){
          setModalOpen(true)
      }
      function closeModal(){
        setModalOpen(false)
      }
 
      const ModalContent = (
        <div>
        <h2 >Здарова пидор!</h2>
        <img  className={styles.picture} style={{width:300, height: 400}} src = {Object.values(ImageContainer)[Math.floor((Math.random() * Object.values(ImageContainer).length))]} />
        <br />
        <button onClick={closeModal}>Закрыть</button>
        </div>
      )
   
    return (
      <section>
      <Button onClick={openModal} >Узнать чемпиона!</Button>
      <Modal open = {ModalOpen}>{ModalContent}</Modal>
      </section>
      
    )
}

