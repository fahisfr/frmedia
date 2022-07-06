import React, { useRef, useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import styles from "../styles/index.module.css";
import Header from "../components/header/header.js";
import { BsEmojiSmile } from "react-icons/bs";

function Home() {
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [postText, setPostText] = useState("");

  const handleInput = (e) => {
    inputRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.left}></div>

        <div className={styles.center}>
          <div className={styles.addpost}>
            <div className={styles.addPostContent}>
              <div className={styles.addPostLeft}>
                <div className={styles.profile}>
                  <img
                    className={styles.profileImg}
                    src="https://images.weserv.nl/?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhnJ1hWMMmWuwad79zvMGaS5el-pfgaNX8cGKF5&w=308&q=75"
                  />
                </div>
              </div>

              <div className={styles.addPostRight_top}>
                <textarea
                  className={styles.addPostInput}
                  type="text"
                  placeholder="What's on your mind?"
                  rows={1}
                  ref={inputRef}
                  onKeyUp={handleInput}
                  onChange={(e) => setPostText(e.target.value)}
                />
                <div></div>

                <div className={styles.addPostRight_bottom}>
                  <div className={styles.addPostM}>

                    <div  className={styles.addPost_m_Group} onClick={(e) => fileRef.current.click()}>
                      <AiOutlineFileImage size={20} color="#007aed" />
                      <div className={styles.m_PopMessage} >
                        <span className={styles.m_MessageText}>Image/Video</span>
                      </div>
                      <input style={{ display: "none" }} type="file" ref={fileRef}/>
                    </div>

                    <div className={styles.addPost_m_Group}>
                      <BsEmojiSmile size={20} color="#007aed" />
                      <div className={styles.m_PopMessage}>
                        <span className={styles.m_MessageText}>Emoji</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.addPostRight_br}>
                    <button className={styles.addPostButton}>
                      <span className={styles.addPostButtonText}>Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div></div>
          <div></div>
        </div>
      </main>
    </div>
  );
}

export default Home;
