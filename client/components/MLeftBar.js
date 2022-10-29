import React from "react";
import styles from "../styles/leftBar.module.css";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineFire } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

function MLeftBar({ trigger, setTrigger }) {
  const router = useRouter();
  const onClickHandler = (path) => {
    router.push(path);
    setTrigger();
  };
  return (
    <div className={styles.ml_container}>
      <div className={styles.ml_con}>
        <nav className={styles.nav}>
          <div className={styles.ml_group} onClick={() => onClickHandler("/")}>
            <AiOutlineHome className={styles.icon} />
            <span className={styles.text}>Home</span>
          </div>

          <div className={styles.ml_group} onClick={() => onClickHandler("/fahis")}>
            <CgProfile className={styles.icon} />
            <span className={styles.text}>Profile</span>
          </div>

          <div className={styles.ml_group} onClick={() => onClickHandler("/explore")}>
            <AiOutlineFire className={styles.icon} />
            <span className={styles.text}>Explore</span>
          </div>

          <div className={styles.ml_group} onClick={() => onClickHandler("/notifications")}>
            <IoMdNotificationsOutline className={styles.icon} />
            <span className={styles.text}> Notifications</span>
          </div>

          <div className={styles.ml_group} onClick={() => onClickHandler("/settings")}>
            <FiSettings className={styles.icon} />
            <span className={styles.text}>Settings</span>
          </div>
        </nav>
      </div>
      <div className={styles.close} onClick={onClickHandler}></div>
    </div>
  );
}

export default MLeftBar;
