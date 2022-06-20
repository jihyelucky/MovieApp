import styles from "./Loading.module.css";
function Load() {
  return (
    <div className={styles.loading}>
      <div className={styles.load}>
        <p>Loading</p>
        <div class="square-holder">
          <div className={styles.square}></div>
        </div>
      </div>
    </div>
  );
}
export default Load;
