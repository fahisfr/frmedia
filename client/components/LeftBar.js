import React from "react";
import styles from "../styles/leftBar.module.css";

import Link from "next/link";
import { AiOutlineHome, AiOutlineFire } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Sidebar() {
  const { isAuth, userInfo } = useSelector((state) => state.user);
  const { userName } = userInfo;
  const { asPath } = useRouter();
  const id = asPath.slice(1);

  return (
    <div className={styles.left_bar}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link className={styles.link} href="/">
            <a className={styles.a}>
              <div className={`${styles.group} ${id === "" && styles.blue}`}>
                <AiOutlineHome className={styles.icon} />
                <span className={styles.text}>Home</span>
              </div>
            </a>
          </Link>

          <Link className={styles.link} href={`${userName}`}>
            <a className={styles.a}>
              <div
                className={`${styles.group} ${id === userName && styles.blue}`}
              >
                <CgProfile className={styles.icon} />
                <span className={styles.text}>Profile</span>
              </div>
            </a>
          </Link>

          <Link className={styles.link} href="/explore">
            <a className={styles.a}>
              <div
                className={`${styles.group} ${id === "explore" && styles.blue}`}
              >
                <AiOutlineFire className={styles.icon} />
                <span className={styles.text}>Explore</span>
              </div>
            </a>
          </Link>

          <Link className={styles.link} href="/notigications">
            <a className={styles.a}>
              <div
                className={`${styles.group} ${
                  id === "notigications" && styles.blue
                }`}
              >
                <IoMdNotificationsOutline className={styles.icon} />
                <span className={styles.text}>Notifications</span>
              </div>
            </a>
          </Link>

          <Link className={styles.link} href="/settings">
            <a className={styles.a}>
              <div
                className={`${styles.group} ${
                  id === "settings" && styles.blue
                }`}
              >
                <FiSettings className={styles.icon} />
                <span className={styles.text}>Settings</span>
              </div>
            </a>
          </Link>
        </nav>

        {/* <div className={styles.suggestion}>
          <div className={styles.sug_top}>
            <h4>Suggestions for you</h4>
          </div>
          <div className={styles.sug_bottom}>
            <div key={index} className={styles.user}>
              <div className={styles.profile}>
                <img className={styles.img} src={item.img} />
              </div>
              <div className={styles.un}>
                <span className={styles.name}>{item.name}</span>
                <MdVerified className={styles.verified} />
              </div>
              <div>
                <button className={styles.btn}>Follow</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
