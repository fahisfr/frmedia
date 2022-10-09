import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/notifications.module.css";
import getDate from "../helper/getDate";
import Post from "../components/Post";
import Comment from "../components/Comment";
import axios from "../axios";
import Reply from "./Reply";

import { baseURL } from "../axios";

export default function Notification({ notif }) {
  const { _id, postId, commentId, replyId, userInfo, type, pcr, date } = notif;
  const [trigger, setTrigger] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const viewNotification = async () => {
    try {
      if (type === "following") {
        router.push(`/${userInfo.userName}`);
        return;
      }

      if (pcr === "post") {
        const { data } = await axios.get(`notif/post/${postId}`);
        if (data.status == "ok") {
          setResult(data.info);
          setTrigger(true);
          return;
        }
        setError(data.error);
      } else if (pcr === "comment") {
        const { data } = await axios.get(
          `/notif/post/${postId}/comment/${commentId}`
        );
        if (data.status == "ok") {
          setResult(data.info);
          setTrigger(true);
          return;
        }
        setError(data.error);
      } else if (pcr === "reply") {
        const { data } = await axios.get(
          `notif/post/${postId}/comment/${commentId}/reply/${replyId}`
        );
        if (data.status == "ok") {
          setResult(data.info);
          setTrigger(true);
          return;
        }
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(result);

  return (
    <div>
      <div key={_id} className={styles.notification} onClick={viewNotification}>
        <div className={styles.n_left}>
          <div className={styles.profile}>
            <img
              className={styles.profile_img}
              src={`${baseURL}/p/${userInfo?.profilePic}`}
            />
          </div>
        </div>
        <div className={styles.n_right}>
          <div>
            <span className={styles.date}>{getDate(date)}</span>
          </div>
          <span className={styles.name}>{notif?.userInfo?.userName}</span>
          <span className={styles.message}>
            {type === "following"
              ? "Started following you"
              : `Was mentioned in a ${pcr}`}
          </span>
        </div>
      </div>
      <div className={styles.pc}>
        {trigger ? (
          error ? (
            <ErrorMessage error={error} />
          ) : loading ? (
            <JustLoading />
          ) : notif.pcr == "post" ? (
            <Post
              userInfo={result.userInfo}
              postInfo={result}
              sliceName="home"
            />
          ) : pcr === "comment" ? (
            <div>
              <Post userInfo={userInfo} postInfo={result} sliceName="home" />
              <Comment postId={postId} comment={result} sliceName="home" />
            </div>
          ) : (
            <>
              <Comment postId={postId} comment={result} sliceName="home" />
              <Reply
                replyInfo={result.replies}
                postId={postId}
                commentId={postId}
                sliceName="home"
              />
            </>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
