import styles from "./JustLoading.module.css";
import React from "react";

function JustLoading({ ws = 25 }) {
  return (
    <>
      <div className={styles.just_loading}>
        <div
          style={{ width: `${ws}px`, height: `${ws}px` }}
          className={styles.just_loading_inner}
        ></div>
      </div>
    </>
  );
}

export default JustLoading;
