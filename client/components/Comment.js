import styles from "../styles/pcr.module.css";
import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import Reply from "./Reply";
import AddPCR from "./AddPCR";
import JustLoading from "./JustLoading";
import { useDispatch } from "react-redux";
import axios, { baseURL } from "../axios";
import getDate from "../helper/getDate";
import ErrorMessage from "./ErrorMessage";
import filterText from "../helper/filterText";
import getPostAcitons from "../features/actions/post";

function Comment({ comment, postId, sliceName }) {
  const dispatch = useDispatch();
  const [addReply, setAddReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [failedFetchReplies, setFailedFetchReplies] = useState(false);
  const { setReplies, likeComment } = getPostAcitons(sliceName);
  const {
    _id,
    text,
    file,
    likesCount,
    repliesCount,
    commentAt,
    liked,
    replies,
  } = comment;
  const { userName, profilePic } = comment.userInfo;

  const getReplies = async () => {
    try {
      setShowReplies(!showReplies);
      if (!replies) {
        const { data } = await axios.get(
          `/post/${postId}/comment/${_id}/replies`
        );

        if (data.status === "ok") {
          dispatch(
            setReplies({
              replies: data.replies,
              postId,
              commentId: _id,
              userName,
            })
          );
        } else {
          setFailedFetchReplies(data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async (e) => {
    try {
      const { data } = await axios.post(
        `/comment/${liked ? "unlike" : "like"}`,
        {
          postId,
          commentId: _id,
        }
      );

      if (data.status === "ok") {
        dispatch(likeComment({ postId, commentId: _id }));
      }
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <img
              className={styles.profile_img}
              src={`${baseURL}/p/${profilePic}`}
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <div className={styles.header_left}>
              <div className={styles.info}>
                <div className={styles.ud}>
                  <div className={styles.group}>
                    <div className={styles.group_left}>
                      <span className={styles.name}>{userName}</span>
                    </div>
                    <div className={styles.group_right}>
                      <MdVerified size={19} color="007aed" />
                    </div>
                  </div>
                  <div className={styles.group}>
                    <span className={styles.date}>{getDate(commentAt)}</span>
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div className={styles.header_right}>
              <div className={styles.menu}>
                <div className={styles.menu_icon}></div>
                <div className={styles.menu_icon}></div>
                <div className={styles.menu_icon}></div>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            {text && <div className={styles.message}>{filterText(text)}</div>}
            <div className={styles.vi}>
              <div className={styles.postFilePreivew}>
                {file && file.type === "image" ? (
                  <Link href="/dev/post/123/fv ">
                    <a>
                      <img
                        className={styles.image}
                        src={`http://localhost:4000/image/${file.name}`}
                      />
                    </a>
                  </Link>
                ) : file?.type === "video" ? (
                  <video
                    controls
                    src="/testvideo.mp4"
                    className={`http://localhost:4000/video/${file.name}`}
                  ></video>
                ) : null}
              </div>
            </div>
          </div>
          <footer className={styles.c_footer}>
            <div className={styles.c_footer_group} onClick={likeHandler}>
              <button className={styles.button}>
                {liked ? (
                  <FcLike className={styles.c_icons} />
                ) : (
                  <BsHeart className={`${styles.c_icons} ${styles.liked}`} />
                )}
                <span>{likesCount}</span>
              </button>
            </div>
            <div className={styles.c_footer_group}>
              <button
                className={styles.button}
                onClick={() => setAddReply(!addReply)}
              >
                <BsChat className={styles.c_icons} />
              </button>
            </div>
          </footer>
          {repliesCount > 0 && (
            <div className={styles.show_replies} onClick={getReplies}>
              <span className={styles.show_replies_text}>
                {showReplies ? "Hide replies" : `Show ${repliesCount} replies`}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.replies}>
        {addReply && (
          <AddPCR
            commentId={_id}
            postId={postId}
            For="reply"
            sliceName={sliceName}
            setTrigger={setAddReply}
          />
        )}
        {failedFetchReplies ? (
          <ErrorMessage error={failedFetchReplies} />
        ) : (
          showReplies && (
            <div className={styles.comments}>
              {replies ? (
                replies.map((reply, index) => {
                  return (
                    <Reply
                      replyInfo={reply}
                      key={index}
                      postId={postId}
                      commentId={_id}
                      sliceName={sliceName}
                    />
                  );
                })
              ) : (
                <JustLoading />
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Comment;
