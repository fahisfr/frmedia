import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { BsFillBellFill } from "react-icons/bs";
import {faker} from "@faker-js/faker"

function header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.link} href="/">
          <span className={styles.title}>FrMedia</span>
        </Link>
        <div className={styles.search}>

          <div className={styles.search_input}>     
           <input className={styles.input} type="text" placeholder="search for user or tags.."/>
           <div className={styles.icon}></div>
          </div>
          
        </div>
        <div className={styles.n_p}>
          
            <button className={styles.notification}>
              <BsFillBellFill color="blue" size={22} />
              <span className={styles.notification_cound}>4</span>
            </button>
            <button className={styles.profile}>
              <img className={styles.image} src="https://images.weserv.nl/?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhnJ1hWMMmWuwad79zvMGaS5el-pfgaNX8cGKF5&w=308&q=75" />
            </button>
            
  
        </div>
      </div>
    </header>
  );
}

export default header;
