import React, { useState } from "react";
import styles from "../styles/pcr.module.css";
import { MdVerified } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineRetweet } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import axios, { baseURL } from "../axios";
import { useDispatch } from "react-redux";
import Comment from "../components/Comment";
import { addComment, setComments, likePost } from "../features/posts";
import JustLoading from "./JustLoading";
import getDate from "../helper/getDate";
import AddPCR from "./AddPCR";
import Text from "./Text";
import ErrorMessage from "./ErrorMessage";

function Post({ postInfo, userInfo, vpost }) {
  const dispatch = useDispatch();
  const {
    _id,
    text,
    file,
    likesCount,
    commentsCount,
    liked,
    postAt,
    comments,
  } = postInfo;
  const { userName, profilePic } = userInfo;

  const [showComments, setshowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [failedToFetchComments, setFailedToFetchComments] = useState(false);

  const getComments = async () => {
    try {
      setshowComments(!showComments);
      if (comments) {
        return;
      } else {
        const { data } = await axios.get(`/post/comments/${_id}`);
        if (data.status === "ok") {
          dispatch(setComments({ comments: data.comments, postId: _id }));
        } else {
          setFailedToFetchComments(data.error);
        }
      }
    } catch (error) {
      setFailedToFetchComments("Failed to fetch comments");
    }
  };

  const likeHandler = async () => {
    const { data } = await axios.post(`/post/${liked ? "unlike" : "like"}`, {
      postId: _id,
    });
    console.log(data.status);
    if (data.status === "ok") {
      dispatch(likePost({ postId: _id }));
    }
  };

  return (
    <>
      <article className={styles.container}>
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
                    <span className={styles.date}>{getDate(postAt)}</span>
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
            {text && (
              <Link href={`/${userName}/post/${_id}`}>
                <a style={{ color: "black" }}>
                  <div className={styles.message}>
                    <Text text={text} />
                  </div>
                </a>
              </Link>
            )}

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
          <footer className={styles.footer}>
            <div className={styles.footer_group}>
              <button className={styles.button} onClick={likeHandler}>
                {liked ? (
                  <FcLike className={styles.icons} />
                ) : (
                  <BsHeart className={`${styles.icons} ${styles.liked}`} />
                )}

                <span>{likesCount}</span>
              </button>
            </div>

            <div className={styles.footer_group}>
              <button
                className={styles.button}
                onClick={() => setAddComment(!vpost && !addComment)}
              >
                <BsChat className={styles.icons} />
              </button>
            </div>

            <div className={styles.footer_group}>
              <button className={styles.button}>
                <AiOutlineRetweet size={19} className={styles.icons} />
              </button>
            </div>

            <div className={styles.footer_group}>
              <button className={styles.button}>
                <FiShare className={styles.icons} />
              </button>
            </div>
          </footer>
          {commentsCount > 0 && !vpost && (
            <div className={styles.show_replies} onClick={getComments}>
              <span className={styles.show_replies_text}>
                {showComments
                  ? "Hide comments"
                  : `Show ${commentsCount} comments`}
              </span>
            </div>
          )}
        </div>
      </article>
      <div className={styles.comments}>
        {addComment && <AddPCR postId={_id} For="comment" />}
        {showComments ? (
          failedToFetchComments ? (
            <ErrorMessage error={failedToFetchComments} />
          ) : comments ? (
            comments.map((comment) => {
              return <Comment comment={comment} postId={_id} />;
            })
          ) : (
            <JustLoading />
          )
        ) : null}
      </div>
    </>
  );
}

export default Post;
