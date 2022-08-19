import styles from "../styles/pcr.module.css";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { MdVerified } from "react-icons/md";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import Reply from "./Reply";
import AddPCR from "./AddPCR";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_RPEPLIES } from "../graphql/qurey";
import { LIKE_COMMENT, UNLIKE_COMMENT } from "../graphql/mutations";
import JustLoading from "./JustLoading";
function Comment({ comment, postId }) {

  const [addReplyTrigger, setAddReplyTrigger] = useState(false);
  const { _id, content, file, likesCount, repliesCount, postAt, liked } =
    comment;
  const { userName } = comment.userInfo;

  const [getRepliesNow, { data, error, loading }] = useLazyQuery(GET_RPEPLIES, {
    variables: {
      commentId: _id,
      postId,
    },
  });

  const [
    likeComment,
    { data: likeData, error: likeError, loading: likeLoading },
  ] = useMutation(LIKE_COMMENT, {
    variables: {
      postId,
      commentId: _id,
    },
  });

  const [
    unLikeComment,
    { data: unlikeData, error: unlikeError, loading: unlikeLoading },
  ] = useMutation(UNLIKE_COMMENT, {
    variables: {
      postId,
      commentId: _id,
    },
  });

  const fillterContent = () => {
    return content.split(" ").map((word) => {
      if (word.startsWith("#")) {
        return (
          <Link href={`/hashtag/${word.slice(1)}`}>
            <a>{word} </a>
          </Link>
        );
      } else if (word.startsWith("@")) {
        return (
          <Link href={`/user/${word.slice(1)}`}>
            <a>{word} </a>
          </Link>
        );
      } else {
        return <span>{word} </span>;
      }
    });
  };

  const likeHandler = (e) => {
    e.preventDefault();
    if (liked) {
      unLikeComment();
    } else {
      likeComment();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <img
              className={styles.profile_img}
              src={faker.image.avatar()}
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
                    <span className={styles.date}>{`3h ago`}</span>
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
            {content && (
              <Link href={`/${userName}/post/${_id}`}>
                <a style={{ color: "black" }}>
                  <div className={styles.message}>{fillterContent()}</div>
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
            <div
              className={styles.c_footer_group}
              onClick={() => {
                setAddReplyTrigger(!addReplyTrigger);
              }}
            >
              <button className={styles.button}>
                <BsChat className={styles.c_icons} />
              </button>
            </div>
            <div
              className={styles.c_footer_group}
              onClick={() => {
                getRepliesNow();
              }}
            >
              <button className={styles.button}>
                <span>{repliesCount} Replies</span>
              </button>
            </div>
          </footer>
        </div>
      </div>

      <div className={styles.replies}>
        {addReplyTrigger && (
          <AddPCR commentId={_id} postId={postId} For="reply" />
        )}
        {loading && <JustLoading />}
        {data &&
          data?.getCommentReplies.replies.map((reply) => (
            <Reply replyInfo={reply} commentId={_id} postId={postId} />
          ))}
      </div>
    </>
  );
}

export default Comment;
