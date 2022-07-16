import React, { useState } from "react";
import styles from "./Post.module.css";
import { faker } from "@faker-js/faker";
import { MdVerified } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { BsChat, BsHeart } from "react-icons/bs";

function Post() {
  const [filePreview, setFilePreview] = useState({ type: "image", url: "" });
  const newPost = {
    name: faker.name.findName(),
    date: faker.date.past(),
    profile: faker.image.avatar(),
    text: faker.lorem.paragraph(),
  };

  const randomNum =()=>Math.floor(Math.random()*1e3)

  return (
    <div className={styles.container}>
      {new Array(10).fill(0).map((item, index) => {
        return (
          <div key={index} className={styles.post}>
            <header className={styles.header}>
              <div className={styles.header_left}>
                <div className={styles.info}>
                  <div className={styles.profile}>
                    <img
                      className={styles.profile_img}
                      src={faker.image.avatar()}
                      alt="profile"
                    />
                  </div>
                  <div className={styles.ud}>
                    <div className={styles.group}>
                      <div className={styles.group_left}>
                        <span className={styles.name}>{faker.name.findName()}</span>
                      </div>
                      <div className={styles.group_right}>
                        <MdVerified size={20} color="007aed" />
                      </div>
                    </div>
                    <div className={styles.group}>
                      <span className={styles.date}>{`${Math.floor(Math.random()*24)}h ago`}</span>
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
            </header>

            <div className={styles.body}>
              <div className={styles.message}>
                <span className={styles.text}>{faker.lorem.paragraph()}</span>
              </div>
              <div className={styles.vi}>
                <div className={styles.postFilePreivew}>
                  {filePreview.type === "image" ? (
                    <img
                      className={styles.image}
                      src={faker.image.imageUrl()}
                      accept="image/*"
                    />
                  ) : filePreview.type === "video" ? (
                    <video
                      controls
                      src="/testvideo.mp4"
                      className={styles.video}
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
                    <BsChat className={styles.icons} />
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
        );
      })}
    </div>
  );
}

export default Post;
