import React, { useState, useEffect } from "react";
import styles from "../styles/profile.module.css";
import { faker } from "@faker-js/faker";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import Post from "./Post";
import axios, { baseURL } from "../axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../features/profiles";
import JustLoading from "./JustLoading";
import ErrorMessage from "./ErrorMessage";

function Profile() {
  const {
    isReady,
    query: { user },
  } = useRouter();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = useSelector((state) => state.profiles).find(
    (profile) => profile.userName === user
  );

  useEffect(() => {
    if (!isReady) return;
    const getProfile = async () => {
      try {
        if (profile) return;
        const { data } = await axios.get(`user/${user}`);
        if (data.status === "ok") {
          dispatch(actions.addProfile(data.profile));
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [isReady, user]);

  const followHandler = async () => {
    try {
      const id = profile._id;
      dispatch(actions.follow({ id }));
      const { data } = axios.post("/user/follow", { id });
      if (!data.status === "ok") {
        dispatch(actions.follow({ id }));
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <JustLoading />;
  }

  return (
    <div className="center">
      <div className={styles.container}>
        <div className={styles.cover_photo}>
          <img
            className={styles.cover_img}
            src={`${baseURL}/c/${profile.coverPic}`}
            alt=""
          />
        </div>

        <div className={styles.info}>
          <div>
            <div className={styles.info_left}>
              <div className={styles.profile}>
                <img
                  className={styles.profile_img}
                  src={`${baseURL}/p/${profile.profilePic}`}
                />
              </div>
            </div>
          </div>

          <div className={styles.info_right}>
            <div className={styles.info_nf}>
              <div className={styles.nf_l}>
                <h2 className={styles.name}>{profile.userName}</h2>
                {user === profile.userName && (
                  <Link href={`${profile.userName}/editprofile`}>
                    <div className={styles.edit}>
                      <FiEdit className={styles.edit_icon} />
                      <div className={styles.edit_icon_m}>
                        <span>Edit&nbsp;Profile </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {profile._following ? (
                  <button
                    className={`${styles.btn} ${styles.unfollow}`}
                    onClick={followHandler}
                  >
                    profile.unfollow
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
                <Link href={`${profile.userName}/following`}>
                  <div>
                    <span className={styles.fw_count}>
                      {profile.followersCount}
                    </span>
                    <span className={styles.fw}> Following</span>
                  </div>
                </Link>
              </div>
              <div>
                <Link href={`${profile.userName}/followers`}>
                  <div>
                    <span className={styles.fw_count}>
                      {profile.followingCount}
                    </span>
                    <span className={styles.fw}> Followers</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.bio}>
              <span className={styles.bio_text}>{profile.bio}</span>
              <div>
                <span>
                  <a target={"_blank"} href="/">
                    {profile.link}
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
        {profile.posts.map((post, index) => {
          return (
            <Post
              userInfo={profile}
              postInfo={post}
              key={index}
              page="profile"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
