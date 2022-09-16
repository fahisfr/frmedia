import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/notifications.module.css";
import JustLoading from "./JustLoading";
import ErrorMessage from "../components/ErrorMessage";
import getDate from "../helper/getDate";

import { fetchNotifications } from "../features/notifications";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../axios";
import { useRouter } from "next/router";
import { IoMdNotificationsOutline } from "react-icons/io";

function Notification() {
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
          <h4 id={styles.top_aln}> Notifications</h4>
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
            <span
              className={`${styles.nv_text} ${path === "liked" && styles.blue}`}
            >
              Liked
            </span>
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
          notif.map((notif, index) => {
            return (
              <Link href={notif.link} key={index}>
                <div className={styles.notification}>
                  <div className={styles.n_left}>
                    <div className={styles.profile}>
                      <img
                        className={styles.profile_img}
                        src={`${baseURL}/p/${notif.userInfo.profilePic}`}
                      />
                    </div>
                  </div>
                  <div className={styles.n_right}>
                    <div>
                      <span className={styles.date}>{getDate(notif.date)}</span>
                    </div>
                    <span className={styles.name}>fahis</span>
                    <span
                      className={styles.message}
                    >{` ${notif.message}`}</span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Notification;
