import React from "react";
import styles from "../styles/confirmation.module.css";

function Confirmation(props) {
  return props.trigger ? (
    <div className={styles.con}>
      <div className={styles.body}>
        <div className={styles.top}>
          <sapn className={styles.message}>{props.message}</sapn>
        </div>
        <div className={styles.bottom}>
          <button
            onClick={() => props.setTrigger(false)}
            className={`${styles.btn_cancel} ${styles.btn}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.confirmed();
              props.setTrigger(false);
            }}
            className={`${props.btnColorRed && styles.red} ${styles.btn}`}
          >
            {props.btnText ?? "continue"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Confirmation;
