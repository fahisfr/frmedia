import React, { useState, useRef } from "react";
import styles from "../styles/pcr.module.css";
import { MdVerified } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineRetweet } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import axios, { baseURL } from "../axios";
import { useDispatch } from "react-redux";
import getDate from "../helper/getDate";
import filterText from "../helper/filterText";
import getPostAcitons from "../features/actions/post";
import { useRouter } from "next/router";
import Options from "./Options";
import clickOutSide from "../hooks/clickOutSide";

function Post({ postInfo, userInfo, sliceName }) {
  const router = useRouter();
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
  const { userName, profilePic, verified, publicID } = userInfo;
  const { likePost } = getPostAcitons(sliceName);
  const [copiedTrigger, setCpiedTrigger] = useState(false);
  const [OptionsTrigger, setOptionsTrigger] = useState(false);
  const optionRef = useRef(null);
  clickOutSide(optionRef, () => {
    setOptionsTrigger(false);
  });
  const likeHandler = async () => {
    dispatch(likePost({ postId: _id }));
    const { data } = await axios.post(`/post/${liked ? "unlike" : "like"}`, {
      postId: _id,
    });
    if (data.status === "error") {
      dispatch(likePost({ postId: _id }));
    }
  };

  const linkCpied = () => {
    navigator.clipboard.writeText(`${baseURL}/post/${_id}`);
    setCpiedTrigger(true);
    setTimeout(() => {
      setCpiedTrigger(false);
    }, 1000);
  };

  return (
    <article className={styles.container}>
      {copiedTrigger && (
        <div className={styles.copied_pop}>
          <span className={styles.copied_text}>Link Copied To Clipboard</span>
        </div>
      )}

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
            <div></div>
            <div></div>
          </div>
          <div
            className={styles.header_right}
            onClick={() => setOptionsTrigger(!OptionsTrigger)}
            ref={optionRef}
          >
            <div className={styles.menu}>
              <Options
                onFouse
                trigger={OptionsTrigger}
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
                <div className={styles.message}>{filterText(text)}</div>
              </a>
            </Link>
          )}

          <div className={styles.vi}>
            <div className={styles.postFilePreivew}>
              {file && file.type === "image" ? (
                <Link href="/dev/post/123/fv ">
                  <img
                    className={styles.image}
                    src={`http://localhost:4000/image/${file.name}`}
                  />
                </Link>
              ) : file?.type === "video" ? (
                <video
                  controls
                  src={`http://localhost:4000/video/${file.name}`}
                  className={styles.video}
                ></video>
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
              onClick={() => {
                router.push(`/post/${_id}`);
              }}
            >
              <BsChat className={styles.icons} />
              <span>{commentsCount}</span>
            </button>
          </div>

          <div className={styles.footer_group}>
            <button className={styles.button}>
              <AiOutlineRetweet size={19} className={styles.icons} />
            </button>
          </div>

          <div className={styles.footer_group}>
            <button className={styles.button} onClick={linkCpied}>
              <FiShare className={styles.icons} />
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}

export default Post;
