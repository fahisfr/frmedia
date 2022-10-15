import React, { useState } from "react";
import styles from "../styles/pcr.module.css";
import { MdVerified } from "react-icons/md";
import { BsChat, BsHeart } from "react-icons/bs";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { useDispatch } from "react-redux";
import AddPCR from "./AddPCR";
import axios, { baseURL } from "../axios";
import filterText from "../helper/filterText";
import getPostAcitons from "../features/actions/post";
import Image from "next/image";
import FilterText from "./FilterText";

function Reply({ replyInfo, postId, commentId, sliceName }) {
  const dispatch = useDispatch();
  console.log(replyInfo, "this one");
  const [addReplyTrigger, setAddReplyTrigger] = useState(false);
  const { _id, text, replyAt, likesCount, liked, file } = replyInfo;
  const { userName, profilePic } = replyInfo.userInfo;
  const { likeReply } = getPostAcitons(sliceName);

  const likeHandler = async (e) => {
    try {
      const { data } = await axios.post(
        `/comment/reply/${liked ? "unlike" : "like"}`,
        { postId, commentId, replyId: _id }
      );
      if (data.status === "ok") {
        dispatch(likeReply({ replyId: _id, postId, commentId }));
      }
    } catch (error) {}
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.profile}>
          <Image
            src={`${baseURL}/p/${profilePic}`}
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
                  <span className={styles.date}>{}</span>
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
              <button className={styles.button}>
                {liked ? (
                  <FcLike className={styles.c_icons} />
                ) : (
                  <BsHeart className={`${styles.c_icons} ${styles.liked}`} />
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
              <BsChat className={styles.c_icons} />
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
