import React from "react";
import styles from "./PostFv.module.css";
import { faker } from "@faker-js/faker";
import Posts from "../../../../../components/post/Post";
import AddPost from "../../../../../components/addPost/AddPost";

function PostFv({ trigger, setTrigger }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.ft}>
          <img
            src={faker.image.image()}
            alt="avatar"
            className={styles.avatar}
          />
        </div>
        <div
          onClick={() => setTrigger(false)}
          className={styles.close_icon}
        ></div>
      </div>
      <div className={styles.right}>
        <Posts />
        <AddPost />
        <Posts />;
      </div>
    </div>
  );
}

export default PostFv;
