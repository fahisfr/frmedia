import React, { useState } from "react";
import styles from "../../styles/profile.module.css";
import { faker } from "@faker-js/faker";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import EditProfile from "../../components/EditProfile";
import Post from "../../components/Post";
import axios, { aixosSSR, baseURL } from "../../axios";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/Main";

function Profile({ status, userInfo }) {
  const { query } = useRouter();

  let {
    _id,
    userName,
    followersCount,
    followingCount,
    bio,
    _following,
    profilePic,
    coverPic,
  } = userInfo;
  const [editProfile, setEditProfile] = useState(false);

  const followHandler = async () => {
    const { data } = await axios.post(
      `/user/${_following ? "unfollow" : "follow"}`,
      { id: _id }
    );

    if (data.status === "ok") {
      _following = !_following;
    }
  };
  return (
    <div className="center">
      <EditProfile
        trigger={editProfile}
        setTrigger={setEditProfile}
        info={userInfo}
      />

      <div className={styles.container}>
        <div className={styles.cover_photo}>
          <img className={styles.cover_img} src={`${baseURL}/c/${coverPic}`} />
        </div>

        <div className={styles.info}>
          <div>
            <div className={styles.info_left}>
              <div className={styles.profile}>
                <img
                  className={styles.profile_img}
                  src={`${baseURL}/p/${profilePic}`}
                />
              </div>
            </div>
          </div>

          <div className={styles.info_right}>
            <div className={styles.info_nf}>
              <div className={styles.nf_l}>
                <h2 className={styles.name}>{userName}</h2>
                {query.id === userName && (
                  <div
                    className={styles.edit}
                    onClick={() => setEditProfile(true)}
                  >
                    <FiEdit className={styles.edit_icon} />
                    <div className={styles.edit_icon_m}>
                      <span>Edit&nbsp;Profile </span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {_following ? (
                  <button
                    className={`${styles.btn} ${styles.unfollow}`}
                    onClick={followHandler}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.follow}`}
                    onClick={followHandler}
                  >
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
          {/* <div className={styles.bv_group}>
            <span className={styles.bvn}>Notifications</span>
          </div> */}
        </div>
        {userInfo.posts.map((post) => {
          return <Post userInfo={userInfo} postInfo={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}


Profile.PageLayout = MainLayout;
export default Profile;

export const getServerSideProps = async ({ req, query }) => {
  const res = await aixosSSR(req, `user/${query.id}`);
  return {
    props: {
      ...res,
    },
  };
};
