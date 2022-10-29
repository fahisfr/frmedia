import styles from "../styles/addPcr.module.css";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import daynamic from "next/dynamic";
import axios, { baseURL } from "../axios";
import { useSelector, useDispatch } from "react-redux";
import SidePopMessage from "./SidePopUpMessage";
import Image from "next/image";
import getPostActions from "../features/actions/post";
import clickOutside from "../hooks/clickOutSide";
import profile from "../features/reducers/profile";

const EmojiPicker = daynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

//addPCR full add(P=Post,C=Comment,R=Reply)
//For == type(post,comment,reply)
//tagged for only addReply
//setTrigger For Comment and Reply
// "redux sliceName for pick right ReduxSlice(getPostAcitons)"

function AddPCR({ For, postId, commentId, sliceName, tagged, setTrigger }) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const emojiRef = useRef(null);

  const [file, setFile] = useState(null);
  const [emojiTrigger, setEmojiTrigger] = useState(false);
  const [text, setText] = useState("");
  const [filePreview, setFilePreview] = useState({ type: "", url: "" });
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({
    trigger: false,
    error: false,
    message: "",
  });
  useEffect(() => {
    if (tagged) {
      setText(tagged);
    }
  }, [tagged]);
  clickOutside(emojiRef, () => {
    setEmojiTrigger(false);
  });
  const { addPost, addComment, addReply } = getPostActions(sliceName);

  const PRC = () => {
    switch (For) {
      case "comment":
        return {
          placeholder: "Write a comment...",
          btnText: "Comment",
          apiPath: "/addcomment",
          updateState: (comment) => {
            dispatch(addComment({ comment, postId }));
          },
        };
      case "post":
        return {
          placeholder: "What's on your mind?",
          btnText: "Post",
          apiPath: "/addpost",
          updateState: (post) => {
            dispatch(addPost({ post }));
          },
        };
      case "reply":
        return {
          placeholder: "Write a reply...",
          btnText: "Reply",
          apiPath: "/comment/add-reply",
          updateState: (reply) => {
            dispatch(addReply({ reply, postId, commentId }));
          },
        };
      default:
        throw new Error("Unknown pcr");
    }
  };

  const { placeholder, btnText, apiPath, updateState } = PRC();

  const submitNow = async (e) => {
    try {
      e.preventDefault();
      if (!text.length > 0 && !file) return;
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", text);
      if (For === "comment" || "reply") {
        formData.append("postId", postId);
      }
      if (For === "reply") {
        formData.append("commentId", commentId);
      }

      const { data } = await axios.post(apiPath, formData);

      if (data.status === "ok") {
        updateState({ ...data.info, userInfo, likesCount: 0 });
        setPopUpInfo({ trigger: true, error: false, message: data.message });
        if (setTrigger) {
          setTrigger(false);
        }
        setText("");
        setFilePreview({ type: "", url: "" });
        setFile(null);
      } else {
        setPopUpInfo({ trigger: true, error: true, message: data.error });
      }
    } catch (err) {
      setPopUpInfo({
        trigger: true,
        error: true,
        message: err,
      });
    } finally {
      setLoading(false);
    }
  };

  const filePreviewNow = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onloadend = () =>
      setFilePreview({ type: file.type.split("/")[0], url: reader.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleInput = (e) => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const onEmojiClick = (event, emojiObject) => {
    setText(`${text}${emojiObject.emoji}`);
  };

  const cancelNow = (e) => {
    setText("");
    inputRef.current.style.height = "auto";
    if (setTrigger) {
      setTrigger(false);
    }
  };

  return (
    <div className={styles.addpost}>
      {popUpInfo.trigger && <SidePopMessage info={popUpInfo} setTrigger={setPopUpInfo} />}

      <div className={styles.add_pc_content}>
        <div className={styles.left}>
          <div className={styles.profile}>
            {userInfo?.profilePic ? (
              <Image
                src={userInfo?.profilePic}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt=" "
              />
            ) : (
              <div className={`${styles.profile} skeleton rounded-full`}></div>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.right_top}>
            <textarea
              className={styles.input}
              type="text"
              value={text}
              rows={1}
              placeholder={placeholder}
              ref={inputRef}
              pattern=" faasf"
              onKeyUp={handleInput}
              required
              onChange={(e) => setText(e.target.value)}
            />

            <div className={styles.pc_file_preivew}>
              {filePreview.type === "image" ? (
                <div>
                  <img className={styles.file_image} src={filePreview.url} accept="image/*" />
                  <div className={styles.removeIcon} onClick={(e) => setFilePreview("")}></div>
                </div>
              ) : filePreview.type === "video" ? (
                <div>
                  <video controls src={filePreview.url} className={styles.video}></video>
                  <div className={styles.removeIcon} onClick={(e) => setFilePreview("")}></div>
                </div>
              ) : null}
            </div>
            <div className={styles.right_bottom}>
              <div className={styles.pc_m}>
                <div className={styles.m_group} onClick={(e) => fileRef.current.click()}>
                  <AiOutlineFileImage size={20} color="#007aed" />
                  <div className={styles.m_pop_message}>
                    <span className={styles.m_message_text}>Photo&nbsp;/&nbsp;Video</span>
                  </div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={fileRef}
                    accept=".jpg,.jpeg,.png,.mp4"
                    onChange={filePreviewNow}
                  />
                </div>
                <div
                  className={styles.m_group}
                  onClick={(e) => setEmojiTrigger(true)}
                  ref={emojiRef}
                >
                  <BsEmojiSmile size={20} color="#007aed" />
                  <div className={styles.m_pop_message}>
                    <span className={styles.m_message_text}>Emoji</span>
                  </div>
                  <div id={styles.emoji} trigger={`${emojiTrigger}`}>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                </div>
              </div>
              <div className={` ${styles.addPostRight_br}  ${loading && styles.btn_loading}`}>
                {(setTrigger || text.length > 0) && !loading ? (
                  <button className={styles.cancel_button} onClick={cancelNow}>
                    <span>Cancel</span>
                  </button>
                ) : null}
                <button
                  onClick={submitNow}
                  className={`${styles.add_post_btn}`}
                  disabled={loading}
                >
                  <span className={styles.btn_text}>{btnText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPCR;
