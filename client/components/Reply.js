import React, { useState } from "react";
import styles from "../styles/pcr.module.css";
import { MdVerified } from "react-icons/md";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { useDispatch } from "react-redux";
import AddPCR from "./AddPCR";
import axios, { baseURL } from "../axios";
import getPostAcitons from "../features/actions/post";
import Image from "next/image";
import FilterText from "./FilterText";
import getDate from "../helper/getDate";

function Reply({ replyInfo, postId, commentId, sliceName }) {
  const dispatch = useDispatch();
  console.log(replyInfo, "this one");
  const [addReplyTrigger, setAddReplyTrigger] = useState(false);
  const { _id, text, replyAt, likesCount, liked, file } = replyInfo;
  const { userName, profilePic } = replyInfo.userInfo;
  const { likeReply } = getPostAcitons(sliceName);

  const likeHandler = async (e) => {
    try {
      dispatch(likeReply({ replyId: _id, postId, commentId }));
      const { data } = await axios.post(`/comment/reply/${liked ? "unlike" : "like"}`, {
        postId,
        commentId,
        replyId: _id,
      });
    } catch (error) {}
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.profile}>
          <Image
            src={profilePic}
            alt=""
            layout="fill"
            objectFit="cover"
            className="img_border_radius"
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
                  <span className={styles.date}>{getDate(replyAt)}</span>
                </div>
              </div>
            </div>
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
          {text && <FilterText text={text} />}
          <div className={styles.vi}>
            <div className={styles.postFilePreivew}>
              {file && file.type === "image" ? (
                <Link href="/dev/post/123/fv ">
                  <a>
                    <img className={styles.image} src={file.url} />
                  </a>
                </Link>
              ) : file?.type === "video" ? (
                <video
                  controls
                  src={file.url}
                  className={styles.video}
                ></video>
              ) : null}
            </div>
          </div>
        </div>
        <footer className={styles.c_footer}>
          <div className={styles.c_footer_group} onClick={likeHandler}>
            <button className={styles.button}>
              <button className={styles.button}>
                {liked ? (
                  <svg class={styles.cr_liked} viewBox="0 0 32 29.6">
                    <path
                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                     c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                    />
                  </svg>
                ) : (
                  <BsHeart className={`${styles.cr_icon} `} />
                )}
                <span>{likesCount}</span>
              </button>
            </button>
          </div>

          <div
            className={styles.footer_group}
            onClick={() => setAddReplyTrigger(!addReplyTrigger)}
          >
            <button className={styles.button}>
              <BsChat className={styles.cr_icon} />
            </button>
          </div>
        </footer>
        <div>
          {addReplyTrigger && (
            <AddPCR
              For="reply"
              postId={postId}
              commentId={commentId}
              setTrigger={setAddReplyTrigger}
              tagged={`@${replyInfo?.userInfo?.userName}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reply;
