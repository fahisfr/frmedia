import React from "react";
import styles from "../styles/rightBar.module.css";

function RightBar() {
  return (
    <div className={styles.right}>
      <div className={styles.container}>
        <div className={styles.trading}>
          <div className={styles.top}>
            <h3>Trading</h3>
          </div>
          <div className={styles.tg_bottom}>
            <div className={styles.post}>
              <div className={styles.postLeft}>
                <span></span>
                <span className={styles.tcond}>asdfs</span>
              </div>

              <div className={styles.postRight}>
                <div>
                  <div className={styles.menu_icon}></div>
                  <div className={styles.menu_icon}></div>
                  <div className={styles.menu_icon}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
