import styles from "../styles/justLoading.module.css";
import React from "react";

function JustLoading({ wh = 25 }) {
  return (
    <>
      <div className={styles.just_loading}>
        <div
          style={{ width: `${wh}px`, height: `${wh}px` }}
          className={styles.just_loading_inner}
        ></div>
      </div>
    </>
  );
}

export default JustLoading;
