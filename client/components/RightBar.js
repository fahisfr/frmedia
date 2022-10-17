import React, { useEffect, useState } from "react";
import styles from "../styles/rightBar.module.css";
import axios from "../axios";
import Link from "next/link";
import JustLoading from "./JustLoading";
function RightBar() {
  const [topHashTags, setTopHashTags] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
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
            {loading ? (
              <JustLoading />
            ) : (
              topHashTags.map((tage, index) => {
                return (
                  <Link href={`/hashtage/${tage._id}`} key={index}>
                    <div className={styles.tagge}>
                      <div className={styles.taggeLeft}>
                        <span className={styles.tcond}>
                          {tage.count} Post Tagged
                        </span>
                        <span className={styles.tagge_name}>#{tage._id}</span>
                      </div>

                      <div className={styles.taggeRight}>
                        <div>
                          <div className={styles.menu_icon}></div>
                          <div className={styles.menu_icon}></div>
                          <div className={styles.menu_icon}></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
