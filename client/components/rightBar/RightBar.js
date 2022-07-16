import { faker } from "@faker-js/faker";
import React from "react";
import styles from "./RightBar.module.css";

function RightBar() {
  return (
    <div className={styles.container}>
      <div className={styles.trading}>
        <div className={styles.top}>
          <h3>Trading</h3>
        </div>
        <div className={styles.tg_bottom}>
          {new Array(19).fill(0).map((num, index) => {
            return (
              <div className={styles.post}>
                <div className={styles.postLeft}>
                  <span>{`#${faker.word.adverb()}`}</span>
                  <span className={styles.tcond}>{`${faker.random.numeric(
                    3
                  )}k Postes`}</span>
                </div>

                <div className={styles.postRight}>
                
                  <div>
                    <div className={styles.menu_icon}></div>
                    <div className={styles.menu_icon}></div>
                    <div className={styles.menu_icon}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
