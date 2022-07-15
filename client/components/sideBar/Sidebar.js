import React from "react";
import styles from "./Sidebar.module.css";

import Link from "next/link";
import { AiOutlineHome, AiOutlineFire } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { faker } from "@faker-js/faker";

function Sidebar() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link className={styles.link} href="/">
          <a className={styles.a}>
            <div className={styles.group}>
              <AiOutlineHome className={styles.icon} />
              <span className={styles.text}>Home</span>
            </div>
          </a>
        </Link>
        <Link className={styles.link} href="/profile">
          <a className={styles.a}>
            <div className={styles.group}>
              <CgProfile className={styles.icon} />
              <span className={styles.text}>Profile</span>
            </div>
          </a>
        </Link>

        <Link className={styles.link} href="/">
          <a className={styles.a}>
            <diV className={styles.group}>
              <AiOutlineFire className={styles.icon} />
              <span className={styles.text}>Explore</span>
            </diV>
          </a>
        </Link>

        <Link className={styles.link} href="/">
          <a className={styles.a}>
            <diV className={styles.group}>
              <FiSettings className={styles.icon} />
              <span className={styles.text}>Settings</span>
            </diV>
          </a>
        </Link>
      </nav>
      <div className={styles.suggestion}>
        <div className={styles.sug_top}>
          <span className={styles.sug_text}>Suggestions for you</span>
        </div>
        <div className={styles.sug_bottom}>
          {new Array(15).fill(0).map(() => {
            return (
              <div className={styles.user}>
                <div className={styles.profile}>
                  <img className={styles.img} src={faker.image.avatar()} />
                </div>
                <div className={styles.un}>
                  <span className={styles.name}>{faker.name.findName()}</span>
                  <MdVerified className={styles.verified} />
                </div>
                <div>
                  <button className={styles.btn}>Follow</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
