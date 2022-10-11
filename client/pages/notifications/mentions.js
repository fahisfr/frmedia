import react, { useState, useEffect } from "react";
import axios from "../../axios";
import NotifLayout from "../../layouts/Notification";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import Reply from "../../components/Reply";
import JustLoading from "../../components/JustLoading";
import ErrorMessage from "../../components/ErrorMessage";

function mentions() {
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
      {mentions?.map((mention) => {
        return (
          <div style={{ position: "relative" }}>
            <span className="pcr">
              {mention.pcr.charAt(0).toUpperCase() + mention.pcr.slice(1)}
            </span>
            {mention.pcr == "post" ? (
              <Post
                userInfo={mention.postInfo.userInfo}
                postInfo={mention.postInfo}
                sliceName="home"
              />
            ) : mention.pcr == "comment" ? (
              <Comment comment={mention.commentInfo} sliceName="home" />
            ) : mention.pcr == "reply" ? (
              <Reply replyInfo={mention.replyInfo} sliceName="home" />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
}

mentions.PageLayout = NotifLayout;

export default mentions;
