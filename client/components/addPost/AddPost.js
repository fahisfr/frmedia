import styles from "./AddPost.module.css";
import React, { useRef, useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import daynamic from "next/dynamic";
const EmojiPicker = daynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

function AddPost({Type}) {
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [files, setFiles] = useState(true);
  const [emojiTrigger, setEmojiTrigger] = useState(false);
  const [postText, setPostText] = useState("");
  const [filePreview, setFilePreview] = useState({ type: "", url: "" });

  const filePreviewNow = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () =>
      setFilePreview({ type: file.type.split("/")[0], url: reader.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleInput = (e) => {
    inputRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const onEmojiClick = (event, emojiObject) => {
    setPostText(`${postText}${emojiObject.emoji}`);
  };

  const TriggerEmojiPicker = () => setEmojiTrigger(!emojiTrigger);

  return (
    <div className={styles.addpost}>
      <div className={styles.add_pc_content}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <img
              className={styles.profileImg}
              src="https://images.weserv.nl/?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhnJ1hWMMmWuwad79zvMGaS5el-pfgaNX8cGKF5&w=308&q=75"
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.right_top}>
            <textarea
              className={styles.input}
              type="text"
              placeholder={Type?.type === "Command" ?"Write a comment" : "What's on your mind?"  }
              rows={1}
              ref={inputRef}
              pattern=" faasf"
              onKeyUp={handleInput}
              required
              onChange={(e) => setPostText(e.target.value)}
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
                  <div className={styles.m_PopMessage}>
                    <span className={styles.m_MessageText}>Image/Video</span>
                  </div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={fileRef}
                    accept=".jpg,.jpeg,.png,.mp4"
                    onChange={filePreviewNow}
                  />
                </div>
                <div className={styles.m_group}>
                  <BsEmojiSmile size={20} color="#007aed" />
                  <div className={styles.m_PopMessage}>
                    <span className={styles.m_MessageText}>Emoji</span>
                  </div>
                </div>
              </div>
              <div className={styles.addPostRight_br}>
                <button className={styles.cancel_button}>
                  <span>Cancel</span>
                </button>
                <button className={styles.addPostButton}>
                  <span className={styles.addPostButtonText}>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
