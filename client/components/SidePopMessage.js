import React from "react";
import styles from "../styles/sidePopMessage.module.css";
import { BiSad } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";

function sidePopMessage({ popupInfo }) {
  const { trigger, error, message } = popupInfo;
  return trigger ? (
    <div className={`${styles.container}  ${styles.pop_now}`}>
      <div>
        {error ? (
          <BiSad className={`${styles.icon} ${styles.err}`} />
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
