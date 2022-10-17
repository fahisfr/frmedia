import Link from "next/link";
import React from "react";
import styles from "../styles/notifications.module.css";
import MainLoayout from "./Main";
import { useRouter } from "next/router";

function Notifications( page ) {
  const { asPath } = useRouter();

  const path = asPath.split("/")[2];

  return MainLoayout(
    <div className={styles.con}>
      <div className={styles.top}>
        <Link href="/notifications">
          <a>
            <h1 className={styles.top_aln}> Notifications</h1>
          </a>
        </Link>
      </div>
      <nav className={styles.nav}>
        <div className={styles.nv_group}>
          <Link href="/notifications/mentions">
            <a>
              <span
                className={`${styles.nv_text} ${
                  path === "mentions" && styles.blue
                }`}
              >
                Mentions
              </span>
            </a>
          </Link>
        </div>
        <div className={styles.nv_group}>
          <Link href="/notifications/following">
            <a>
              <span
                className={`${styles.nv_text} ${
                  path === "following" && styles.blue
                }`}
              >
                Following
              </span>
            </a>
          </Link>
        </div>
        <div className={styles.nv_group}>
          <Link href="/notifications/liked">
            <a>
              <span
                className={`${styles.nv_text} ${
                  path === "liked" && styles.blue
                }`}
              >
                Liked
              </span>
            </a>
          </Link>
        </div>
      </nav>
      <div className={styles.notifications}>{page}</div>
    </div>
  );
}

export default Notifications;
