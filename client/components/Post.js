import React, { useState, useRef } from "react";
import styles from "../styles/pcr.module.css";
import { MdVerified } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineRetweet } from "react-icons/ai";
import axios, { baseURL } from "../axios";
import { useDispatch } from "react-redux";
import getDate from "../helper/getDate";
import getPostAcitons from "../features/actions/post";
import { useRouter } from "next/router";
import Options from "./Options";
import clickOutSide from "../hooks/clickOutSide";
import Image from "next/image";
import FilterText from "./FilterText";

function Post({ postInfo, userInfo, sliceName }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { _id, text, file, likesCount, commentsCount, liked, postAt, comments } = postInfo;
  const { userName, profilePic, verified, publicID } = userInfo;
  const { likePost } = getPostAcitons(sliceName);
  const [copiedTrigger, setCpiedTrigger] = useState(false);
  const [optionsTrigger, setOptionsTrigger] = useState(false);
  const optionRef = useRef(null);
  clickOutSide(optionRef, () => {
    setOptionsTrigger(false);
  });

  const likeHandler = async () => {
    dispatch(likePost({ postId: _id }));
    const { data } = await axios.post(`/post/${liked ? "unlike" : "like"}`, {
      postId: _id,
    });
  };

  const linkCpied = () => {
    navigator.clipboard.writeText(`${baseURL}/post/${_id}`);
    setCpiedTrigger(true);
    setTimeout(() => {
      setCpiedTrigger(false);
    }, 1000);
  };

  return (
    <article className={`${styles.container} ${styles.con_border}`}>
      {copiedTrigger && (
        <div className={styles.copied_pop}>
          <span className={styles.copied_text}>Link Copied To Clipboard</span>
        </div>
      )}

      <div className={styles.left}>
        <div className={styles.profile}>
          <Image
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            src={profilePic}
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
                    <Link href={`/${userName}`}>
                      <span className={styles.name}>{userName}</span>
                    </Link>
                  </div>

                  {verified && (
                    <div className={styles.group_right}>
                      <MdVerified className={styles.verified} />
                    </div>
                  )}
                </div>
                <div className={styles.group}>
                  <span className={styles.date}>{getDate(postAt)}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.header_right}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOptionsTrigger(!optionsTrigger);
              }
            }}
            ref={optionRef}
          >
            <div className={styles.menu}>
              <Options
                onFouse
                trigger={optionsTrigger}
                id={_id}
                userId={publicID}
                sliceName={sliceName}
                setTrigger={setOptionsTrigger}
              />
              <div className={styles.menu_icon}></div>
              <div className={styles.menu_icon}></div>
              <div className={styles.menu_icon}></div>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          {text && (
            <Link href={`/post/${_id}`}>
              <a>
                <FilterText text={text} />
              </a>
            </Link>
          )}

          <div className={styles.vi}>
            <div >
              {file && file.type === "image" ? (
                <Link href={`/post/${_id}`}>
                  <img className={styles.image} src={file.url} />
                </Link>
              ) : file?.type === "video" ? (
                <video controls className={styles.video} src={file.url}></video>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footer_group}>
            <button className={styles.button} onClick={likeHandler}>
              {liked ? (
                <svg className={styles.liked} viewBox="0 0 32 29.6">
                  <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                  />
                </svg>
              ) : (
                <BsHeart className={`${styles.icon} `} />
              )}

              <span>{likesCount}</span>
            </button>
          </div>

          <div className={styles.footer_group}>
            <button
              className={styles.button}
              onClick={() => {
                router.push(`/post/${_id}`);
              }}
            >
              <BsChat className={styles.icon} />
              <span>{commentsCount}</span>
            </button>
          </div>

          <div className={styles.footer_group}>
            <button className={styles.button}>
              <AiOutlineRetweet size={21} className={styles.icons} />
            </button>
          </div>

          <div className={styles.footer_group}>
            <button className={styles.button} onClick={linkCpied}>
              <FiShare className={styles.icon} />
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}

export default Post;
