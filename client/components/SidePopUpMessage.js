import React, { useEffect } from "react";
import styles from "../styles/sidePopMessage.module.css";
import { BiSad } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";

function sidePopMessage({  popUpInfo, setTrigger }) {
  const { error, message } = popUpInfo;
  useEffect(() => {
    setTimeout(() => {
      setTrigger({ trigger: false, error: false });
    }, 5000);
  }, []);
  return (
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
  );
}

export default sidePopMessage;
