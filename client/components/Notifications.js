import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/notifications.module.css";
import JustLoading from "./JustLoading";
import ErrorMessage from "../components/ErrorMessage";
import { baseURL } from "../axios";

import { fetchNotifications } from "../features/notifications";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IoMdNotificationsOutline } from "react-icons/io";
import getDate from "../helper/getDate";

function Notifications() {
  const router = useRouter();
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

  const path = router.asPath.split("/")[2];

  const getNotifications = () => {
    switch (path) {
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

  const onClick = ({ pcr, type, userInfo, postId, commentId }) => {
    if (type === "following") {
      router.push(`/${userInfo?.userName}`);
    } else if (pcr == "post") {
      router.push(`/post/${postId}`);
    } else if (pcr == "reply" || "comment") {
      router.push(`/post/${postId}/comment/${commentId}`);
    }
  };

  return (
    <div className={styles.con}>
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
            return (
              <div
                key={notif._id}
                className={styles.notification}
                onClick={() => onClick(notif)}
              >
                <div className={styles.n_left}>
                  <div className={styles.profile}>
                    <img
                      className={styles.profile_img}
                      src={`${baseURL}/p/${notif.userInfo?.profilePic}`}
                    />
                  </div>
                </div>
                <div className={styles.n_right}>
                  <div>
                    <span className={styles.date}>{getDate(notif.date)}</span>
                  </div>
                  <span className={styles.name}>
                    {notif?.userInfo?.userName}
                  </span>
                  <span className={styles.message}>
                    {notif.type === "following"
                      ? " Started following you"
                      : ` Was mentioned in a ${notif.pcr}`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Notifications;
