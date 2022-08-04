import styles from "./AddPost.module.css";
import React, { useRef, useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import daynamic from "next/dynamic";
import { faker } from "@faker-js/faker";
import axios from "../../axios";

const EmojiPicker = daynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

function AddPost({ Type }) {
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [emojiTrigger, setEmojiTrigger] = useState(false);

  const [postText, setPostText] = useState("");
  const [filePreview, setFilePreview] = useState({ type: "", url: "" });

  const addPostNow = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("content", postText);

    const {
      data: { success, message },

    } = await axios.post("/addpost", formData);

    if (!success){
      alert(message);
    }
    setPostText("");
    setFilePreview({ type: "", url: "" });
    setFile(null);
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
    setPostText(`${postText}${emojiObject.emoji}`);
  };

  const cancelNow = (e) => {
    setPostText("");
    inputRef.current.style.height = "auto";
  };

  const TriggerEmojiPicker = () => setEmojiTrigger(!emojiTrigger);

  const onSubmit = (e) => {
    e.preventDefault();
    addPostNow();
  };

  return (
    <div className={styles.addpost}>
      <div className={styles.add_pc_content}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <img className={styles.profileImg} src={faker.image.avatar()} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.right_top}>
            <textarea
              className={styles.input}
              type="text"
              value={postText}
              placeholder={
                Type?.type === "Command"
                  ? "Write a comment"
                  : "What's on your mind?"
              }
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
                {postText.length > 0 && (
                  <button className={styles.cancel_button} onClick={cancelNow}>
                    <span>Cancel</span>
                  </button>
                )}
                <button onClick={addPostNow} className={styles.addPostButton}>
                  <span className={styles.addpost_btn_text}>Post</span>
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
