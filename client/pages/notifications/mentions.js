import react, { useState, useEffect } from "react";
import axios from "../../axios";
import NotifLayout from "../../layouts/Notification";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import Reply from "../../components/Reply";
import JustLoading from "../../components/JustLoading";
import ErrorMessage from "../../components/ErrorMessage";
import styles from "../../styles/notifications.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
function Mentions() {
  const [mentions, setMentions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getMentions = async () => {
        console.log("yes is workn");
        const { data } = await axios.get("notifications/mentions");
        if (data.status === "ok") {
          console.log(data);
          setMentions(data.mentions);
        }
        setError(data.error);
      };

      getMentions();
    } catch (err) {
      alert(err);
      setError(err);
    } finally {
      console.log("yes");
      setLoading(false);
    }
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    <JustLoading />;
  }

  return (
    <>
      {mentions.length > 0 ? (
        mentions?.map((mention, index) => {
          return (
            <div key={index} style={{ position: "relative" }}>
              <span className="pcr">
                {mention.pcr.charAt(0).toUpperCase() + mention.pcr.slice(1)}
              </span>
              {mention.pcr == "post" ? (
                <Post
                  userInfo={mention?.info?.userInfo}
                  postInfo={mention.info}
                  sliceName="home"
                />
              ) : mention.pcr == "comment" ? (
                <Comment comment={mention.info} sliceName="home" />
              ) : mention.pcr == "reply" ? (
                <Reply replyInfo={mention.info} sliceName="home" />
              ) : (
                ""
              )}
            </div>
          );
        })
      ) : (
        <div className={styles.empty_notif}>
          <IoMdNotificationsOutline className={styles.icon} />
          <sapn className={styles.empty_text}>No Mentions yet</sapn>
        </div>
      )}
    </>
  );
}

Mentions.PageLayout = NotifLayout;

export default Mentions;
