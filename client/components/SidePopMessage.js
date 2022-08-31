import React from "react";
import styles from "../styles/sidePopMessage.module.css";
import { BiError } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";

function sidePopMessage({ popupInfo }) {
  const { trigger, err, message } = popupInfo;
  return trigger ? (
    <div className={`${styles.container}  ${styles.pop_now}`}>
      <div>
        {err ? (
          <BiError className={`${styles.icon} ${styles.err}`} />
        ) : (
          <BsCheckCircleFill className={`${styles.icon} ${styles.success}`} />
        )}
      </div>
      <div className={styles.message}>
        <span className={styles.message_text}>{message}</span>
      </div>
    </div>
  ) : null;
}

export default sidePopMessage;
