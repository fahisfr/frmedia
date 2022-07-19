import React from "react";
import styles from "./Profile.module.css";
import { faker } from "@faker-js/faker";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import Post from "../../components/post/Post";

function Profile() {
  return (
    <div className="center">
      <div className={styles.container}>
        <div className={styles.cover_photo}>
          <img className={styles.cover_img} src={faker.image.image()} />
        </div>

        <div className={styles.info}>
          <div>
            <div className={styles.info_left}>
              <div className={styles.profile}>
                <img
                  className={styles.profile_img}
                  src={faker.image.avatar()}
                />
              </div>
            </div>
          </div>

          <div className={styles.info_right}>
            <div className={styles.info_nf}>
              <div className={styles.nf_l}>
                <h2 className={styles.name}>{faker.name.lastName()}</h2>

                <div className={styles.edit}>
                  <FiEdit className={styles.edit_icon} />
                  <div className={styles.edit_icon_m}>
                    <span>Edit&nbsp;Profile </span>
                  </div>
                </div>
              </div>
              <div>
                {Math.random() > 0.5 ? (
                  <button className={`${styles.btn} ${styles.follow}`}>
                    Follow
                  </button>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.unfollow}`}
                  ></button>
                )}
              </div>
            </div>
            <div className={styles.fw_c}>
              <div>
                <Link href="/">
                  <a>
                    <div>
                      <span className={styles.fw_count}>
                        {faker.random.numeric(2)}
                      </span>
                      <span className={styles.fw}> Following</span>
                    </div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <a>
                    <div>
                      <span className={styles.fw_count}>
                        {faker.random.numeric(3)}k
                      </span>
                      <span className={styles.fw}> Following</span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className={styles.bio}>
              <span className={styles.bio_text}>
                {faker.lorem.sentences(3)}
              </span>
              <div>
                <span>
                  <a target={"_blank"} href="/">
                    {faker.internet.url()}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bv_group}>
            <sapn className={styles.bvn}>Posts</sapn>
          </div>
          <div className={styles.bv_group}>
            <span className={styles.bvn}>Reples</span>
          </div>
        </div>
      </div>
      <Post />
    </div>
  );
}

export default Profile;
