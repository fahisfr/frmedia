import styles from "../styles/addPcr.module.css";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import daynamic from "next/dynamic";
import axios, { baseURL } from "../axios";
import { useSelector, useDispatch } from "react-redux";
import SidePopMessage from "./SidePopMessage";
import { addPost, addComment, addReply } from "../features/posts";
const EmojiPicker = daynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

function AddPCR({ For, postId, commentId }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [emojiTrigger, setEmojiTrigger] = useState(false);

  const [text, setText] = useState("");
  const [filePreview, setFilePreview] = useState({ type: "", url: "" });
  const { userInfo } = useSelector((state) => state.user);
  const [popupInfo, setPopupInfo] = useState({
    trigger: false,
    error: false,
    message: "",
  });

  const PRC = () => {
    switch (For) {
      case "comment":
        return {
          placeholder: "Write a comment...",
          btnText: "Comment",
          apiPath: "/addcomment",
          updateState: (comment) => {
            console.log(comment);
            dispatch(addComment({ comment, postId }));
          },
        };
      case "post":
        return {
          placeholder: "What's on your mind?",
          btnText: "Post",
          apiPath: "/addpost",
          updateState: (post) => {
            console.log(post);
            dispatch(addPost(post));
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
        setPopupInfo({ trigger: true, error: false, message: data.message });

        setText("");
        setFilePreview({ type: "", url: "" });
        setFile(null);
      } else {
        setPopupInfo({ trigger: true, error: true, message: data.error });
      }
    } catch (err) {
      console.log(err);
      setPopupInfo({
        trigger: true,
        error: true,
        message: "oops something went wrong on your browser:(",
      });
    } finally {
      setTimeout(() => {
        setPopupInfo({ trigger: false, error: false, message: "" });
      }, 5000);
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
  };

  const TriggerEmojiPicker = () => setEmojiTrigger(!emojiTrigger);

  return (
    <div className={styles.addpost}>
      <SidePopMessage popupInfo={popupInfo} />

      <div className={styles.add_pc_content}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <img
              className={styles.profileImg}
              src={`${baseURL}/p/${userInfo?.profilePic}`}
            />
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
                  <img
                    className={styles.file_image}
                    src={filePreview.url}
                    accept="image/*"
                  />
                  <div
                    className={styles.removeIcon}
                    onClick={(e) => setFilePreview("")}
                  ></div>
                </div>
              ) : filePreview.type === "video" ? (
                <div>
                  <video
                    controls
                    src={filePreview.url}
                    className={styles.video}
                  ></video>
                  <div
                    className={styles.removeIcon}
                    onClick={(e) => setFilePreview("")}
                  ></div>
                </div>
              ) : null}
            </div>
            <div className={styles.right_bottom}>
              <div className={styles.pc_m}>
                <div
                  className={styles.m_group}
                  onClick={(e) => fileRef.current.click()}
                >
                  <AiOutlineFileImage size={20} color="#007aed" />
                  <div className={styles.m_pop_message}>
                    <span className={styles.m_message_text}>
                      Photo&nbsp;/&nbsp;Video
                    </span>
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
                  onClick={(e) => setEmojiTrigger(!emojiTrigger)}
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
              <div className={styles.addPostRight_br}>
                {text.length > 0 && (
                  <button className={styles.cancel_button} onClick={cancelNow}>
                    <span>Cancel</span>
                  </button>
                )}
                <button onClick={submitNow} className={styles.addPostButton}>
                  <span className={styles.addpost_btn_text}>{btnText}</span>
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
