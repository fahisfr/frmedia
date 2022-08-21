import React, { useState } from "react";
import styles from "../styles/profile.module.css";
import { faker } from "@faker-js/faker";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import EditProfile from "./EditProfile";
import { useMutation } from "@apollo/client";
import { FOLLOW, UNFOLLOW } from "../graphql/mutations";
import Post from "./Post";

function Profile({ userInfo }) {
  const { _id, userName, followersCount, followingCount, bio, followed } =
    userInfo;

  const [followNow, { data: fData, loading: fLoading, error: fError }] =
    useMutation(FOLLOW, {
      variables: {
        followId: _id,
      },
    });
  const [unfollowNow, { data: uData, loading: uLoading, error: uError }] =
    useMutation(UNFOLLOW, {
      variables: {
        unFollowId: _id,
      },
    });

  const [editProfile, setEditProfile] = useState(false);
  return (
    <div className="center">
      <EditProfile trigger={editProfile} setTrigger={setEditProfile} info={userInfo} />

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
                <h2 className={styles.name}>{userName}</h2>
                <div
                  className={styles.edit}
                  onClick={() => setEditProfile(true)}
                >
                  <FiEdit className={styles.edit_icon} />
                  <div className={styles.edit_icon_m}>
                    <span>Edit&nbsp;Profile </span>
                  </div>
                </div>
              </div>
              <div>
                {followed ? (
                  <button className={`${styles.btn} ${styles.unfollow}`}onClick={()=>{unfollowNow()}} >
                    unfollow
                  </button>
                ) : (
                  <button className={`${styles.btn} ${styles.follow}`} onClick={()=>{followNow()}}>
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className={styles.fw_c}>
              <div>
                <Link href="/">
                  <a>
                    <div>
                      <span className={styles.fw_count}>{followersCount}</span>
                      <span className={styles.fw}> Following</span>
                    </div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <a>
                    <div>
                      <span className={styles.fw_count}>{followingCount}</span>
                      <span className={styles.fw}> Following</span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className={styles.bio}>
              <span className={styles.bio_text}>{bio}</span>
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
            <span className={styles.bvn}>Notifications</span>
          </div>
        </div>
        {userInfo.posts.map((post) => {
          return <Post userInfo={userInfo} postInfo={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}

export default Profile;
