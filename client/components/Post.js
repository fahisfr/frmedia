import React, { useState } from "react";
import styles from "../styles/pcr.module.css";
import { faker } from "@faker-js/faker";
import { MdVerified } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { BiRepost } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

import AddPost from "./AddPCR";

function Post({ postInfo, userInfo }) {
  const { _id,text, file, likesCount, commentsCount, liked } = postInfo;
  const { userName } = userInfo;

  const randomNum = () => "4";

  const likeHandler = () => {
    if (liked) {
      unlikePostNow();
    } else {
      likePostNow();
    }
  };

  const fillterContent = () => {
    return text.split(" ").map((word) => {
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

  return (
    <article className={styles.container}>
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
                  <span className={styles.date}>{`${randomNum()}h ago`}</span>
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
            <button className={styles.button}>
              <Link href="/command">
                <a>
                  <BsChat className={styles.icons} />
                </a>
              </Link>
              <span>{commentsCount}</span>
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
      </div>
    </article>
  );
}

export default Post;
