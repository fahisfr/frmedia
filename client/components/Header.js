import React, { useState } from "react";
import styles from "../styles/header.module.css";
import Link from "next/link";
import { BsFillBellFill } from "react-icons/bs";
import { faker } from "@faker-js/faker";
import { MdVerified } from "react-icons/md";

function Header() {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.link} href="/">
          <span className={styles.title}>FrMedia</span>
        </Link>
        <div className={styles.search}>
          <div className={styles.search_input}>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="search for user or tags.."
            />
            <div className={styles.icon}></div>
            <div className={styles.result}>
              <div className={styles.result_item}>
                <div className={styles.result_item_right}>
                  <img className={styles.img} alt="" />
                </div>
                <div className={styles.result_item_left}>
                  <span className={styles.text}></span>
                  <MdVerified className={styles.verified_icon} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.n_p}>
          <button className={styles.notification}>
            <BsFillBellFill color="blue" size={22} />
            <span className={styles.notification_cound}>4</span>
          </button>
          <div className={styles.profile}>
            <button className={styles.profile_btn}>
              <img
                className={styles.image}
                src="https://images.weserv.nl/?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhnJ1hWMMmWuwad79zvMGaS5el-pfgaNX8cGKF5&w=308&q=75"
              />
            </button>{" "}
            {/* <div className={styles.profile_div}>
         
              <div className={styles.p_group}>
                <button className={styles.logout}>Logout</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
