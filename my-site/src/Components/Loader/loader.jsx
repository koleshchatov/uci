import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={`${styles.spinner} ${styles.center}`}>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
      <div className={styles.spinner_blade}></div>
    </div>
  );
}
