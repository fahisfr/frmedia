import React, { useState } from "react";
import styles from "./Post.module.css";
import { faker } from "@faker-js/faker";
import { MdVerified } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";

function Post({ post }) {
  const {
    id,
    userInfo: { userName },
    content,
    file,
    likes,
    comments,
    postAt,
    editedAt,
  } = post;

  const randomNum = () => Math.floor(Math.random() * 1e3);

  return (
    <div className={styles.post}>
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
                    <MdVerified size={20} color="007aed" />
                  </div>
                </div>
                <div className={styles.group}>
                  <span className={styles.date}>{`${postAt}h ago`}</span>
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

              <div className={styles.message}>
                <span className={styles.text}>{content}</span>
              </div>
            
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
              ) : file.type === "video" ? (
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
          <div className={styles.footer_conten}>
            <div className={styles.footer_group}>
              <button className={styles.button}>
                <BsHeart className={styles.icons} />
                <span>{randomNum()}</span>
              </button>
            </div>

            <div className={styles.footer_group}>
              <button className={styles.button}>
                <Link href="/command">
                  <a>
                    <BsChat className={styles.icons} />
                  </a>
                </Link>

                <span>{randomNum()}</span>
              </button>
            </div>

            <div className={styles.footer_group}>
              <button className={styles.button}>
                <FiShare className={styles.icons} />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Post;
