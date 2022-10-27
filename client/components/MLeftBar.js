import React from "react";
import styles from "../styles/leftBar.module.css";
import Link from "next/link";
import { AiOutlineHome, AiOutlineFire } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Image from "next/image";

function MLeftBar({ trigger, setTrigger }) {
  const onClickHandler = () => {
    setTrigger();
  };
  return (
    <div className={styles.ml_container}>
      <div className={styles.ml_con}>
        <nav className={styles.nav}>
          <Link href="/">
            <a>
              <div className={styles.ml_group}>
                <AiOutlineHome className={styles.icon} />
                <span className={styles.text}>Home</span>
              </div>
            </a>
          </Link>

          <Link href="">
            <a>
              <div className={styles.ml_group}>
                <CgProfile className={styles.icon} />
                <span className={styles.text}>Profile</span>
              </div>
            </a>
          </Link>
          <Link href="/explore">
            <a>
              <div className={styles.ml_group}>
                <AiOutlineFire className={styles.icon} />
                <span className={styles.text}>Explore</span>
              </div>
            </a>
          </Link>

          <Link href="/notifications">
            <a>
              <div className={styles.ml_group}>
                <IoMdNotificationsOutline className={styles.icon} />
                <span className={styles.text}> Notifications</span>
              </div>
            </a>
          </Link>
          <Link href="/settings">
            <a>
              <div className={styles.ml_group}>
                <FiSettings className={styles.icon} />
                <span className={styles.text}>Settings</span>
              </div>
            </a>
          </Link>
        </nav>
      </div>
      <div className={styles.close} onClick={onClickHandler}></div>
    </div>
  );
}

export default MLeftBar;
