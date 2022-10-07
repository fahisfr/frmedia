import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/notifications.module.css";
import JustLoading from "./JustLoading";
import ErrorMessage from "../components/ErrorMessage";
import Notification from "./Notification";

import { fetchNotifications } from "../features/notifications";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IoMdNotificationsOutline } from "react-icons/io";

function Notifications() {
  const { asPath } = useRouter();
  const [Error, setError] = useState(false);
  const dispatch = useDispatch();
  const { notifications, fetched, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    try {
      if (!fetched && !loading) {
        dispatch(fetchNotifications());
      }
    } catch (error) {
      setError("opps somthin went wrong");
    }
  }, []);

  const path = asPath.split("/")[2];

  const getNotifications = () => {
    switch (path) {
      case "mentions":
        return notifications.filter((res) => res.type === "mention");
      case "liked":
        return notifications.filter((res) => res.type === "liked");
      case "following":
        return notifications.filter((res) => res.type === "following");
      default:
        return notifications;
    }
  };
  const notif = getNotifications();

  if (Error) {
    return <ErrorMessage error={Error} />;
  }

  return (
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
      <div className={styles.notifications}>
        {error ? (
          <ErrorMessage error={error} />
        ) : loading ? (
          <JustLoading />
        ) : notif.length < 1 ? (
          <div className={styles.empty_notif}>
            <IoMdNotificationsOutline className={styles.icon} />
            <sapn className={styles.empty_text}>No Notification yet</sapn>
          </div>
        ) : (
          notif.map((notif) => {
            return <Notification notif={notif} />;
          })
        )}
      </div>
    </div>
  );
}

export default Notifications;
