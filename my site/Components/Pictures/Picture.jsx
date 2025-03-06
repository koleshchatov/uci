import styles from './Picture.module.css'
import React from 'react'



export default function Picture({image}){
    
    return (
        <div className={styles.block}> 
            <img src = {image} className={styles.picture} alt = 'Здесь фотка пидора' /> 
        </div>
      
    )
   
}  

