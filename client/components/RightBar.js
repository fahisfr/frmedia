import React, { useEffect, useState } from "react";
import styles from "../styles/rightBar.module.css";
import axios from "../axios";
import jushLoading from "./JustLoading"

function RightBar() {
  const [topHashTags, setTopHashTags] = useState([]);
  useEffect(() => {
    try {
      const getTags = async () => {
        const { data } = await axios.get("/top-hash-tags");
        if (data.status === "ok") {
          setTopHashTags(data.hashTags);
        }
      };
      getTags();
    } catch (err) {
      alert(err);
    }
  }, []);
  return (
    <div className={styles.right}>
      <div className={styles.container}>
        <div className={styles.trading}>
          <div className={styles.top}>
            <h3>Trading Tags</h3>
          </div>
          <div className={styles.tg_bottom}>
            {topHashTags.map((tage) => {
              return (
                <div className={styles.post}>
                  <div className={styles.postLeft}>
                    <span className={styles.tcond}>
                      {tage.count}  People Tagged
                    </span>
                    <h1 className={styles.tage}>#{tage._id}</h1>
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
    </div>
  );
}

export default RightBar;
