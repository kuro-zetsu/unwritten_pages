import styles from "../assets/css/Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <p>Loading your journal...</p>
    </div>
  );
}

export default Loading;
